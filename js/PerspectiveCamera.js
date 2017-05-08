var PerspectiveCamera = function() 
{ 
  this.position = new Vec3(0.0,0.0, 0.0); 
  this.ahead = new Vec3(0.0, 0.0, -1.0); 
  this.right = new Vec3(1.0, 0.0, 0.0); 
  this.up = new Vec3(0.0, 1.0, 0.0);  
  
  this.yaw = 0.0; 
  this.pitch = 0.0; 
  this.fov = 1.0; 
  this.aspect = 11.0; 
  this.nearPlane = 0.1; 
  this.farPlane = 1000.0; 
   
  this.speed = 10; 
  
  this.isDragging = false; 
  this.mouseDelta = new Vec2(0.0, 0.0); 
  
 
  this.viewMatrix = new Mat4(); 
  this.projMatrix = new Mat4();
  this.viewProjMatrix = new Mat4();  
  this.updateViewMatrix();
  this.updateProjMatrix();  
}; 
  
PerspectiveCamera.worldUp = new Vec3(0, 1, 0); 

 
PerspectiveCamera.prototype.updateViewMatrix = function(){ 
  this.viewMatrix.set( 
    this.right.x          ,  this.right.y      ,  this.right.z       , 0, 
    this.up.x             ,  this.up.y         ,  this.up.z          , 0, 
   -this.ahead.x          , -this.ahead.y      ,  -this.ahead.z      , 0, 
    0  , 0  , 0   , 1).translate(this.position).invert();
  
  this.viewProjMatrix.set(this.viewMatrix).mul(this.projMatrix); 
   
}; 

PerspectiveCamera.prototype.updateProjMatrix = function(){ 
  var yScale = 1.0 / Math.tan(this.fov * 0.5); 
  var xScale = yScale / this.aspect; 
  var f = this.farPlane; 
  var n = this.nearPlane; 
  this.projMatrix.set( 
      xScale ,    0    ,      0       ,   0, 
        0    ,  yScale ,      0       ,   0, 
        0    ,    0    ,  (n+f)/(n-f) ,  -1, 
        0    ,    0    ,  2*n*f/(n-f) ,   0); 
  this.viewProjMatrix.set(this.viewMatrix).
                      mul(this.projMatrix); 
}; 

PerspectiveCamera.prototype.move = function(dt, keysPressed, mousePressed) { 
  if(this.isDragging){ 
    this.yaw -= this.mouseDelta.x * 0.002; 
    this.pitch -= this.mouseDelta.y * 0.002; 
    if(this.pitch > 3.14/2.0) { 
      this.pitch = 3.14/2.0; 
    } 
    if(this.pitch < -3.14/2.0) { 
      this.pitch = -3.14/2.0; 
    } 
    this.mouseDelta = new Vec2(0.0, 0.0); 

      this.ahead = new Vec3(
     -Math.sin(this.yaw)*Math.cos(this.pitch),
      Math.sin(this.pitch),
     -Math.cos(this.yaw)*Math.cos(this.pitch) ); 
    this.right.setVectorProduct(
      this.ahead,
      PerspectiveCamera.worldUp ); 
    this.right.normalize(); 
    this.up.setVectorProduct(this.right, this.ahead); 
  } 
   if(keysPressed.W) { 
    this.position.addScaled(this.speed * dt, this.ahead); 
  } 
  if(keysPressed.S) { 
    this.position.addScaled(-this.speed * dt, this.ahead); 
  } 
  if(keysPressed.D) { 
    this.position.addScaled(this.speed * dt, this.right); 
  } 
  if(keysPressed.A) { 
    this.position.addScaled(-this.speed * dt, this.right); 
  } 
  if(keysPressed.E) { 
    this.position.addScaled(this.speed * dt, PerspectiveCamera.worldUp); 
  } 
  if(keysPressed.Q) { 
    this.position.addScaled(-this.speed * dt, PerspectiveCamera.worldUp); 
  } 



  
  this.updateViewMatrix(); 
}; 

PerspectiveCamera.prototype.follow = function(avatar){
  var avatar_pos = new Vec3(avatar.position.x, avatar.position.y, avatar.position.z);
  //console.log(avatar_pos.y);
  this.ahead = avatar.forward;
  this.ahead.normalize();
  this.right.setVectorProduct(
  this.ahead, PerspectiveCamera.worldUp ); 
  this.right.normalize();
  this.position = avatar_pos.minus(avatar.forward.normalize().times(40));
  this.position.x = Math.max(-95, Math.min(this.position.x, 95));
  this.position.z = Math.max(-450, Math.min(this.position.z, 450));
  this.updateViewMatrix();
}

PerspectiveCamera.prototype.mouseDown = function( ) { 
  console.log("down");
  this.isDragging = true; 
  this.mouseDelta.set(); 
}; 
  
PerspectiveCamera.prototype.mouseMove = function(event) { 
  this.mouseDelta.x += event.movementX; 
  this.mouseDelta.y += event.movementY; 
  event.preventDefault();  
}; 
  
PerspectiveCamera.prototype.mouseUp = function() { 
  
  this.isDragging = false; 
}; 
  
PerspectiveCamera.prototype.setAspectRatio = function(ar) 
{ 
  this.aspect = ar; 
  this.updateProjMatrix(); 
};