var QuadGeometry = function(gl) {
  this.gl = gl;
  this.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
        -1, -1, 0,
        -1,  1, 0,
         1, -1, 0,
         1,  1, 0,
    ]),
    gl.STATIC_DRAW);

this.vertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
       0, 0, 1,
       0, 0, 1,
       0, 0, 1,
       0, 0, 1,
    ]),
    gl.STATIC_DRAW);
this.vertexTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
         0, 1,
         0, 0,
         1, 1,
         1, 0,
    ]),
    gl.STATIC_DRAW);
  this.indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([
      0, 1, 2,
      1, 2, 3,
    ]),
    gl.STATIC_DRAW);

  // this.vertexColorBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER,
  //   new Float32Array([
  //     1,(183/255),(204/255),
  //     (184/255), (93/255), (222/255),
  //     (184/255), (93/255), (222/255),
  //     1,(183/255),(204/255),
  //     ]),
  //   gl.STATIC_DRAW);
 }
QuadGeometry.prototype.setVertexBuffer = function(vertexArray){
  var gl = this.gl;
  this.vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    vertexArray,
    gl.STATIC_DRAW);
}

QuadGeometry.prototype.setColorBuffer = function(colorArray){
  var gl = this.gl;
  this.vertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
     colorArray,
    gl.STATIC_DRAW);
}

QuadGeometry.prototype.draw = function() {
  var gl = this.gl;
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0,
    3, gl.FLOAT, //< three pieces of float
    false, //< do not normalize (make unit length)
    0, //< tightly packed
    0 //< data starts at array start
  );
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1,
    3, gl.FLOAT, //< three pieces of float
    false, //< do not normalize (make unit length)
    0, //< tightly packed
    0 //< data starts at array start
  );
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoordBuffer);
  gl.enableVertexAttribArray(2);
  gl.vertexAttribPointer(2,
    2, gl.FLOAT, //< two pieces of float
    false, //< do not normalize (make unit length)
    0, //< tightly packed
    0 //< data starts at array start
  );
  // gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
  // gl.enableVertexAttribArray(3);
  // gl.vertexAttribPointer(3,
  //   3, gl.FLOAT,
  //   false,
  //   0,
  //   0
  // );

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
}
