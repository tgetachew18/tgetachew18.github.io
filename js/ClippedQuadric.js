var ClippedQuadric = function(surfaceCoeffMatrix, clipperCoeffMatrix, brdf, property) {
  this.surfaceCoeffMatrix = surfaceCoeffMatrix;
  this.clipperCoeffMatrix = clipperCoeffMatrix;
  this.brdf =brdf;
  this.property = property;
  this.texture =  null;
}

ClippedQuadric.prototype.setInfinitePlane = function(){

  this.surfaceCoeffMatrix = new Mat4();
  this.surfaceCoeffMatrix.set(     		0, 0, 0, 0,
  										0, 1, 0, 0,
  										0, 0, 0, 0,
  										0, 0, 0, -1 );
  this.clipperCoeffMatrix = new Mat4();
  this.clipperCoeffMatrix.set(			0, 0, 0, 0,
  										0, 0, 0, 0,
  										0, 0, 0, 0,
  										0, 0, 0, -0.5 );
}


ClippedQuadric.prototype.setUnitSphere = function(){
	console.log(this.property);

  this.surfaceCoeffMatrix = new Mat4();
  this.surfaceCoeffMatrix.set(     		1, 0, 0, 0,
  										0, 1, 0, 0,
  										0, 0, 1, 0,
  										0, 0, 0, -1 );
  this.clipperCoeffMatrix = new Mat4();
  this.clipperCoeffMatrix.set(			0, 0, 0, 0,
  										0, 0, 0, 0,
  										0, 0, 0, 0,
  										0, 0, 0, -0.5 );
}

ClippedQuadric.prototype.setUnitCylinder = function(){

  this.surfaceCoeffMatrix = new Mat4();
  this.surfaceCoeffMatrix.set(     		1, 0, 0, 0,
  										0, 0, 0, 0,
  										0, 0, 1, 0,
  										0, 0, 0, -1 );
  this.clipperCoeffMatrix = new Mat4();
  this.clipperCoeffMatrix.set(			0, 0, 0, 0,
  										0, 1, 0, 0,
  										0, 0, 0, 0,
  										0, 0, 0, -0.5 );
}

ClippedQuadric.prototype.setUnitCone = function(){
  this.surfaceCoeffMatrix = new Mat4();
  this.surfaceCoeffMatrix.set(     		1, 0, 0, 0,
  										0, -1, 0, 0,
  										0, 0, 1, 0,
  										0, 0, 0, 0 );
  this.clipperCoeffMatrix = new Mat4();
  this.clipperCoeffMatrix.set(			0, 0, 0, 0,
  										0, 1, 0, 0,
  										0, 0, 0, 0,
  										0, 0, 0, -1 );
  this.translateClipper(new Vec3(0,-1,0));
}	



ClippedQuadric.prototype.transform  = function(t){
	var T  = new Mat4();
	T.set(t).invert();
	var Ttrans = new Mat4();
	Ttrans.set(T).transpose();
	var Aprime = new Mat4();
	Aprime.set(this.surfaceCoeffMatrix).premul(T).mul(Ttrans);
	this.surfaceCoeffMatrix.set(Aprime);
	Aprime.set(this.clipperCoeffMatrix).premul(T).mul(Ttrans);;
	this.clipperCoeffMatrix.set(Aprime);



}

ClippedQuadric.prototype.translate = function(args){
	var transMatrix = new Mat4();
	transMatrix.set().translate(args);
	this.transform(transMatrix);

}

ClippedQuadric.prototype.translateClipper = function(args){
	var transMatrix = new Mat4();
	var current = new Mat4();
	current.set(this.surfaceCoeffMatrix);
	transMatrix.set().translate(args);
	this.transform(transMatrix);
	this.surfaceCoeffMatrix.set(current);

}

ClippedQuadric.prototype.scale = function(args){
	var transMatrix = new Mat4();
	transMatrix.set().scale(args);
	this.transform(transMatrix);
}