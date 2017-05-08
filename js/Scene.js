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



  this.backprogram = new Program(gl, this.backvs, this.backfs);
  var ballMatrix  = new Mat4();
  ballMatrix.set(
    1, 0, 0, 0,  //ax^2 +bxy + cxz + dx +eyx +fy^2 + ... = 0
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -9);

  this.beachBall  = new GameObject2D(gl,this.backprogram, [ballMatrix], []);



 


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
  this.beachBall.draw(this.camera,[],[]);


}