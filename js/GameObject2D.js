
var GameObject2D = function(gl, program, clipped_quadrics,  lights) { 
  this.material  = new Material(gl, program);
  this.lights = lights;
  this.clipped_quadrics = clipped_quadrics;
  var j = 0;
  for (var i =  0; i < this.clipped_quadrics.length; i+=1 ){
    this.material.brdfs[i].set(this.clipped_quadrics[i].brdf);
    this.material.properties[i].set(this.clipped_quadrics[i].property);
    this.material.quadrics[j].set(this.clipped_quadrics[i].surfaceCoeffMatrix);
    this.material.quadrics[j+1].set(this.clipped_quadrics[i].clipperCoeffMatrix);
    j += 2
  }


  this.mesh =  new Mesh(new QuadGeometry(gl), this.material);

  this.position = new Vec3(0, 0, 0);   
  this.velocity = new Vec3(0, 0, 0);
  this.acceleration = new Vec3(0, 0, 0);
  this.orientation = 0; 
  this.scale = new Vec3(1, 1, 1); 
  this.xAxis = new Vec3(1, 0, 0);
  this.yAxis = new Vec3(0, 1, 0);
  this.zAxis = new Vec3(0, 0, 1);
  this.axis = this.xAxis;
  this.ahead = new Vec3(0.0, 0.0, 1.0); 
  this.right = new Vec3(1.0, 0.0, 0.0); 
  this.up = new Vec3(0.0, 1.0, 0.0);  
  
  this.modelMatrix = new Mat4(); 				
  this.type = null;

  this.updateModelTransformation();

  
};

GameObject2D.prototype.updateModelTransformation = function(){
	this.modelMatrix.set().scale(this.scale).rotate(this.orientation, this.axis).translate(this.position);

};		

GameObject2D.prototype.update   = function(){
  var j = 0;
  for (var i =  0; i < this.clipped_quadrics.length; i+=1 ){
    this.material.brdfs[i].set(this.clipped_quadrics[i].brdf);
    this.material.properties[i].set(this.clipped_quadrics[i].property);
    this.material.quadrics[j].set(this.clipped_quadrics[i].surfaceCoeffMatrix);
    this.material.quadrics[j+1].set(this.clipped_quadrics[i].clipperCoeffMatrix);
    j += 2
  }
};

GameObject2D.prototype.draw = function(camera){ 
  var E = new Mat4();
  E.set().translate(camera.position);
  Material.shared.modelViewProjMatrix.set().mul(this.modelMatrix).mul(camera.viewProjMatrix);
  Material.shared.eyePos.set(camera.position);
  Material.shared.rayDirMatrix.set().mul(E).mul(camera.viewProjMatrix).invert();


  for (var i = 0; i < this.lights.length; i++){
    Material.shared.lightPos[i].set(this.lights[i].source);
    Material.shared.lightPowerDensity[i].set(this.lights[i].intensity);
    

    

 
 
  }

  this.mesh.draw(); 
};




