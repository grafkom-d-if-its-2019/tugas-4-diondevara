(function() {

  glUtils.SL.init({ callback: function() { main(); }});
  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);


    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.a1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.a1.fragment);
    var vertexShader1 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.c1.vertex);
    var fragmentShader1 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.c1.fragment);
    var vertexShaderCube = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShaderCube = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);

    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var program1 = glUtils.createProgram(gl, vertexShader1, fragmentShader1);
    var programCube = glUtils.createProgram(gl, vertexShaderCube, fragmentShaderCube);

    //garis
    thetaLocL = gl.getUniformLocation(program1, 'theta');
    transLocL = gl.getUniformLocation(program1, "vec");
    sizeLocL = gl.getUniformLocation(program1, 'size');
    thetaL = [20, 60, 0];
    vec1 = [0, 0, 0];
    vec1X = -0.008;
    vec1Y = 0.006;
    vec1Z = 0.02;
    sizeL = 0.2;

    //segitiga
    thetaLoc = gl.getUniformLocation(program, 'theta');
    transLoc = gl.getUniformLocation(program, 'vec');
    sizeLoc = gl.getUniformLocation(program, 'size');
    thetaT = [20, 60, 0];
    vec = [0, 0, 0];
    vecX = 0.006;
    vecY = 0.004;
    vecZ = 0.02;
    size = 0.2;
    nrp = 0.080;

    //kubus
    var thetaLocCube = gl.getUniformLocation(programCube, 'theta');
    var thetaCube = [15, 50, 0];

    function cube(){
      gl.useProgram(programCube);

      var cubeVertices = [
        // ABCD
        -0.5, -0.5, 0.5,    0.0, 1.0, 1.0,    //A
        -0.5, 0.5, 0.5,     0.0, 1.0, 1.0,    //B
        -0.5, 0.5, 0.5,     0.0, 1.0, 1.0,    //B
        0.5, 0.5, 0.5,      0.0, 1.0, 1.0,    //C
        0.5, 0.5, 0.5,      0.0, 1.0, 1.0,    //C
        0.5, -0.5, 0.5,     0.0, 1.0, 1.0,    //D
        0.5, -0.5, 0.5,     0.0, 1.0, 1.0,    //D
        -0.5, -0.5, 0.5,    0.0, 1.0, 1.0,    //A
        
        // DCGH
        0.5, 0.5, 0.5,      0.0, 1.0, 1.0,    //C
        0.5, 0.5, -0.5,     0.0, 1.0, 1.0,    //G
        0.5, -0.5, 0.5,     0.0, 1.0, 1.0,    //D
        0.5, -0.5, -0.5,    0.0, 1.0, 1.0,    //H

        // ABFE
        -0.5, -0.5, 0.5,    0.0, 1.0, 1.0,    //A
        -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,    //E
        -0.5, 0.5, 0.5,     0.0, 1.0, 1.0,    //B
        -0.5, 0.5, -0.5,    0.0, 1.0, 1.0,    //F

        // EFGH
        -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,    //E
        -0.5, 0.5, -0.5,    0.0, 1.0, 1.0,    //F
        -0.5, 0.5, -0.5,    0.0, 1.0, 1.0,    //F
        0.5, 0.5, -0.5,     0.0, 1.0, 1.0,    //G
        0.5, 0.5, -0.5,     0.0, 1.0, 1.0,    //G
        0.5, -0.5, -0.5,    0.0, 1.0, 1.0,    //H
        0.5, -0.5, -0.5,    0.0, 1.0, 1.0,    //H
        -0.5, -0.5, -0.5,   0.0, 1.0, 1.0    //E
      ];

      var cubeVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(programCube, 'vPosition');
      var vColor = gl.getAttribLocation(programCube, 'vColor');
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
        6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      gl.uniform3fv(thetaLocCube, thetaCube);
    }

    function lines(){
      gl.useProgram(program1);

      var lineVertices = [
        -0.9, -0.5,           1.0, 1.0, 0.0,  // kuning 
        -0.9, +0.5,           1.0, 1.0, 0.0,  // kuning
        -0.9, +0.5,           1.0, 1.0, 0.0, // kuning
        -0.6, +0.5,           1.0, 1.0, 0.0, // kuning
        -0.6, +0.5,           1.0, 1.0, 0.0,// kuning
        -0.5, +0.3,           1.0, 1.0, 0.0, // kuning
        -0.5, +0.3,           1.0, 1.0, 0.0, // kuning
        -0.5, -0.3,           1.0, 1.0, 0.0, // kuning  
        -0.5, -0.3,           1.0, 1.0, 0.0, // kuning
        -0.6, -0.5,           1.0, 1.0, 0.0, // kuning
        -0.6, -0.5,           1.0, 1.0, 0.0, // kuning
        -0.9, -0.5,           1.0, 1.0, 0.0, // kuning  
        ////
        -0.8, +0.3,           1.0, 1.0, 0.0, // kuning
        -0.6, +0.3,           1.0, 1.0, 0.0, // kuning
        -0.6, +0.3,           1.0, 1.0, 0.0, // kuning
        -0.6, -0.3,           1.0, 1.0, 0.0, // kuning
        -0.6, -0.3,           1.0, 1.0, 0.0, // kuning
        -0.8, -0.3,           1.0, 1.0, 0.0, // kuning
        -0.8, -0.3,           1.0, 1.0, 0.0, // kuning
        -0.8, +0.3,           1.0, 1.0, 0.0  // kuning
      ];

      var lineVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program1, 'vPosition');
      var vColor = gl.getAttribLocation(program1, 'vColor');

      gl.vertexAttribPointer(
        vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
      );
      gl.vertexAttribPointer(
        vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
      );
    
      gl.uniform1f(sizeLocL, sizeL);

      // pemantulan

      if(vec1[0] < -0.5*(1-sizeL) || vec1[0] > 0.5*(1-sizeL))
      {
        vec1X = vec1X * -1;
      }
      vec1[0] += vec1X;

      if(vec1[1] < -0.5*(1-sizeL) || vec1[1] > 0.5*(1-sizeL))
      {
        vec1Y = vec1Y * -1;
      }
      vec1[1] += vec1Y;

      if(vec1[2] < -0.5*(1-sizeL) || vec1[2] > 0.5*(1-sizeL))
      {
        vec1Z = vec1Z * -1;
      }
      vec1[2] += vec1Z;

      gl.uniform3fv(transLocL, vec1);

      // Y Rotation

      thetaL[1] += ( nrp * 3 );

      gl.uniform3fv(thetaLocL, thetaL);
    }

    function triangle(){
      gl.useProgram(program);

      var triangleVertices = [
        //x   //y
      +0.0, -0.5,                   1.0, 1.0, 0.0,  // kuning
      +0.0, +0.5,                   1.0, 1.0, 0.0,  // kuning
      +0.1, +0.5,/*segitiga1*/      1.0, 1.0, 0.0,  // kuning
      +0.0, -0.5,                   1.0, 1.0, 0.0,  // kuning
      +0.1, +0.5,                   1.0, 1.0, 0.0,  // kuning
      +0.1, -0.5,/*segitiga2*/      1.0, 1.0, 0.0,  // kuning
      +0.1, +0.3,                   1.0, 1.0, 0.0,  // kuning
      +0.1, +0.5,                   1.0, 1.0, 0.0,  // kuning
      +0.3, +0.3,/*segitiga3*/      1.0, 1.0, 0.0,  // kuning
      +0.1, +0.5,                   1.0, 1.0, 0.0,  // kuning
      +0.3, +0.5,                   1.0, 1.0, 0.0,  // kuning
      +0.3, +0.3,/*segitiga4*/      1.0, 1.0, 0.0,  // kuning
      +0.3, +0.5,                   1.0, 1.0, 0.0,  // kuning
      +0.3, +0.3,                   1.0, 1.0, 0.0,  // kuning
      +0.4, +0.3,/*segitiga5*/      1.0, 1.0, 0.0,  // kuning
      +0.3, +0.3,                   1.0, 1.0, 0.0,  // kuning
      +0.3, -0.3,                   1.0, 1.0, 0.0,  // kuning
      +0.4, -0.3,/*segitiga6*/      1.0, 1.0, 0.0,  // kuning
      +0.3, +0.3,                   1.0, 1.0, 0.0,  // kuning
      +0.4, +0.3,                   1.0, 1.0, 0.0,  // kuning
      +0.4, -0.3,/*segitiga7*/      1.0, 1.0, 0.0,  // kuning
      +0.3, -0.3,                   1.0, 1.0, 0.0,  // kuning
      +0.4, -0.3,                   1.0, 1.0, 0.0,  // kuning
      +0.3, -0.5,/*segitiga8*/      1.0, 1.0, 0.0,  // kuning
      +0.3, -0.3,                   1.0, 1.0, 0.0,  // kuning
      +0.1, -0.3,                   1.0, 1.0, 0.0,  // kuning
      +0.1, -0.5,/*segitiga9*/      1.0, 1.0, 0.0,  // kuning
      +0.3, -0.3,                   1.0, 1.0, 0.0,  // kuning
      +0.3, -0.5,                   1.0, 1.0, 0.0,  // kuning
      +0.1, -0.5,                   1.0, 1.0, 0.0  // kuning

      ];

      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');

      gl.vertexAttribPointer(
        vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
      );
      gl.vertexAttribPointer(
        vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
      );

      gl.uniform1f(sizeLoc, size);

      // mantul

      if(vec[0] < -0.5*(1-size) || vec[0] > 0.5*(1-size) )
      {
        vecX = vecX * -1;
      }
      vec[0] += vecX;

      if(vec[1] < -0.5*(1-size) || vec[1] > 0.5*(1-size) )
      {
        vecY = vecY * -1;
      }
      vec[1] += vecY;

      if(vec[2] < -0.5*(1-size) || vec[2] > 0.5*(1-size))
      {
        vecZ = vecZ * -1;
      }
      vec[2] += vecZ;

      gl.uniform3fv(transLoc, vec);

      // gl.enableVertexAttribArray(vPosition);
      // gl.enableVertexAttribArray(vColor);

      // Y Rotation

      thetaT[1] += ( nrp * 3 );

      gl.uniform3fv(thetaLoc, thetaT);
    }
    
    
    

    function render()
    {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFERR_BIT);
      
      lines();
      gl.drawArrays(gl.LINES, 0, 20);
      
      triangle();
      gl.drawArrays(gl.TRIANGLES, 0, 30);

      cube();
      gl.drawArrays(gl.LINES, 0, 24);
      
      requestAnimationFrame(render);
    }
    render();
  }
})();