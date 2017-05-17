var Scene = function(gl, output) {



  gl.enable(gl.BLEND);
  
  gl.blendFunc(
  gl.SRC_ALPHA,
  gl.ONE_MINUS_SRC_ALPHA);

  gl.enable(gl.DEPTH_TEST);

 
  // in constructor 
  this.vsTrafo2d = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "blue_fs.essl"); 
  this.fsRegular = new Shader(gl, gl.FRAGMENT_SHADER, "plain_fs.essl");
  this.plainvs = new Shader(gl, gl.VERTEX_SHADER, "ground_vs.essl");
  this.plainfs = new Shader(gl, gl.FRAGMENT_SHADER, "color_fs.essl");
  this.backvs = new Shader(gl, gl.VERTEX_SHADER, "back_vs.essl");
  this.backfs = new Shader(gl, gl.FRAGMENT_SHADER, "back_fs.essl");
  var BEACH_BALL = new Vec4(0,0,0,0); //Vec4 used as an ID so the shader recognizes objects 
  var ISLAND = new Vec4(1,0,0,0);
  var OCEAN = new Vec4(2,0,0,0);
  var SAND_CASTLE = new Vec4(3,0,0,0);
  var SKY = new Vec4(4, 0, 0, 0);


  this.backprogram = new Program(gl, this.backvs, this.backfs);
  this.parasolprogram =  new Program(gl, this.backvs, this.plainfs);
  this.objects = [];
  directionalLight = new Light(new Vec3(500, 1000, 0), new Vec3(1,1,1,1));
  var lights = [directionalLight];
  var ball = new ClippedQuadric([], [], new Vec4(1,0,1,0), BEACH_BALL);

  var island = new ClippedQuadric([],[], new Vec4(1,0,0,199),ISLAND);
  ball.setUnitSphere();
  ball.translate(new Vec3(0,3,0));
  island.setUnitSphere();
  island.scale(new Vec3(9.0,0.5,10));
  this.objects.push(ball);
  this.objects.push(island);
  //Make a parasol
  var parasolStand = new ClippedQuadric([],[], new Vec4(1,0.4,1,0),new Vec3(3,0,0));
  parasolStand.setUnitCylinder();  
  parasolStand.scale(new Vec3(0.2, 4.0, 0.2));
  parasolStand.translate(new Vec3(-6.5, 3, 0));
  this.objects.push(parasolStand);

  var parasolCover = new ClippedQuadric([],[], new Vec4(0,1,1,0),BEACH_BALL);
  parasolCover.setUnitSphere();
  parasolCover.clipperCoeffMatrix.set(     0, 0, 0, 0,
                                            0, 1, 0, 0,
                                            0, 0, 0, 0,
                                            0, 0, 0, -0.5 );

  parasolCover.translateClipper(new Vec3(0,1.0,0));

  this.objects.push(parasolCover);

  parasolCover.scale(new Vec3(4.0,2.0,4.0));
  parasolCover.translate(new Vec3(-6.5,3.6,0));

  //Make an architectural wonder 


  var bastions = [];
  var bastion_pos = [new Vec3(0,2,8), new Vec3(4,2,8), new Vec3(0,2,4), new Vec3(4,2,4)];
  var castleCenter = new ClippedQuadric([],[], [],BEACH_BALL);
  var castleRoof = new ClippedQuadric([], [], [], BEACH_BALL);
  castleCenter.setUnitCylinder();
  castleRoof.setUnitSphere();
  castleCenter.scale(new Vec3(2.5, 1.2, 2.5));
  castleRoof.scale(new Vec3(2.55,0.01,2.55));
  castleCenter.translate(new Vec3(2,0.7,6.2));
  castleRoof.translate(new Vec3(2,1.4,6.15));
  this.objects.push(castleCenter);
  this.objects.push(castleRoof);
  var z = 1;
  for (var i = 0 ; i  < 4; i ++){
    var bastion = new ClippedQuadric([],[], new Vec4(1,0.1,1,0),BEACH_BALL);
    var bastionCol = new ClippedQuadric([],[], new Vec4(1,0.1,1,0),BEACH_BALL);
    bastionCol.setUnitCylinder();
    bastion.setUnitCylinder();
    var bastionCap = new ClippedQuadric([], [],new Vec4(1,0.1,1,0), BEACH_BALL);
    bastionCap.setUnitCone();
    bastionCap.scale(new Vec3(0.4,0.4,0.4));
    bastion.scale(new Vec3(0.7, .5, 0.7));
    bastionCol.scale(new Vec3(0.5,1.2,0.5));

    bastionCap.translate(bastion_pos[i]);
    bastionCap.translate(new Vec3(0,1.1,0));
    bastion.translate(bastion_pos[i]);
    bastionCol.translate(bastion_pos[i]);
    bastionCol.translate(new Vec3(0,-1,0));
   
    

    bastions.push(bastion);
    this.objects.push(bastionCap);
    this.objects.push(bastionCol);
    this.objects.push(bastion);
  }


  //Ideally reflective ocean
  var ocean = new ClippedQuadric([],[],new Vec4(1,1,0,201), OCEAN);
  ocean.setInfinitePlane();
  ocean.translate(new Vec3(0,-1.5,0));
  this.objects.push(ocean);

  
  var sky = new ClippedQuadric([],[],new Vec4(1,1,0,199), SKY);
  sky.setInfinitePlane();
  sky.translate(new Vec3(0,20.5,0));
  this.objects.push(sky);
  

  





  this.beachScene  = new GameObject2D(gl,this.backprogram, this.objects,  lights);




 


  this.camera = new PerspectiveCamera();
  this.camera.position.y += 2;
  this.camera.position.z += 10.;
  this.timeAtLastFrame = new Date().getTime();
  



 }

Scene.prototype.update = function(gl, keysPressed, mousePressed) {
	// // set clear color (part of the OpenGL render state)
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	// // clear the screen
	gl.clear(gl.COLOR_BUFFER_BIT);  
	this.count += 1;
	var timeAtThisFrame = new Date().getTime();
	var dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
	this.timeAtLastFrame = timeAtThisFrame;
    

  this.camera.move(dt, keysPressed);
  // //this.truck.Draw(this.camera);
  this.beachScene.draw(this.camera,[],[]);
      


}