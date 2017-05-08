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
  this.backfs = new Shader(gl, gl.FRAGMENT_SHADER, "back_fs.essl")
  this.backprogram = new Program(gl, this.backvs, this.backfs);

  this.backMaterial  = new Material(gl, this.backprogram);
  this.skyCubeTexture = new  TextureCube(gl, ["js/res/heroes/posx512.jpg", //x //right
                                               "js/res/heroes/negx512.jpg", //-x //left
                                               "js/res/heroes/posy512.jpg",  //y //top
                                               "js/res/heroes/negy512.jpg", //-y //bottom
                                               "js/res/heroes/posz512.jpg",  //z //front
                                               "js/res/heroes/negz512.jpg",]); //-z //back

  this.backMaterial.envmapTexture.set(this.skyCubeTexture);
  this.backMaterial.quadrics[0].set(
    1, 0, 0, 0,  //ax^2 +bxy + cxz + dx +eyx +fy^2 + ... = 0
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -16).translate(new Vec3(0,-2,0));
  //clipper
  this.backMaterial.quadrics[1].set(
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -2);//.scale(0.5, 2, 0.9);
  
  this.backMaterial.quadrics[2].set(
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -1);

  this.backMaterial.quadrics[3].set(
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -3).translate(new Vec3(0,-2,0));



  this.backMaterial.brdfs[0].set(1, 1, 1, 0);
  this.backMesh = new Mesh(new QuadGeometry(gl), this.backMaterial);
  this.background = new GameObject2D(this.backMesh);

 


  this.camera = new PerspectiveCamera();
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
  //this.truck.Draw(this.camera);
  this.background.draw(this.camera,[],[]);


}