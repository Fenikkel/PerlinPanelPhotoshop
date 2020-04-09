// Most functions extracted from here https://genekogan.com/code/p5js-perlin-noise/ and https://p5js.org/reference/#/p5/noise 
document.getElementById("simplexNoise").addEventListener("click", SimplexNoise);
document.getElementById("perlinNoise").addEventListener("click", PerlinNoise);

document.getElementById("modifyedPerlinNoise").addEventListener("click", PerlinNoiseModifyed);

document.getElementById("perlinCurves").addEventListener("click", CurvesLowNoise);
document.getElementById("perlinCurves2").addEventListener("click", CurvesHightNoise);

document.getElementById("perlinCurves3").addEventListener("click", Curves2LowNoise);
document.getElementById("perlinCurves4").addEventListener("click", Curves2HightNoise);

function SimplexNoise(){

  drawNoise("simplex");

}

function PerlinNoise(){

  drawNoise("perlin");

}

function CurvesHightNoise(){

  PerlinCurves(0.01);

}

function CurvesLowNoise(){

  PerlinCurves(0.003);

}

function Curves2HightNoise(){

  PerlinCurves2(0.025);

}

function Curves2LowNoise(){

  PerlinCurves2(0.003);

}

//PERLING CURVES 1

function PerlinCurves(noise){


  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 960;
  canvas.height = 500;
  
  var context = canvas.getContext('2d');

  context.fillColor = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  var width = canvas.width,
  height = canvas.height,
  noiseScale = noise,
  actorStepLength = 1,
  numActors = 10000,
  step = 0,
  steps = 150;

  

  var actors = [];
  for(var i = 0; i < numActors; i++) {
    
      actors.push(actor(width, height, noiseScale, actorStepLength));
      
  }

  var opacity = easeInOut(steps);

  
 
  d3.timer(function() {
    if(++step > steps) {
        console.log("done with animation");
        return true;
    }
    context.lineWidth = 1;
    context.globalCompositeOperation = 'lighter';
    context.beginPath();
    for(var i in actors) {
        var a = actors[i];
        var ln = a.step();
        var alpha = 0.6*opacity.get();
        context.strokeStyle = "rgba(49, 130, 189, " + alpha + ")";
        context.moveTo(ln.x1, ln.y1);
        context.lineTo(ln.x2, ln.y2);
    }
    context.stroke();
    opacity.step();
  });



}

function actor(width, height, noiseScale, stepLength) {

  var x = Math.random() * width,
      y = Math.random() * height;
      
  var noise = perlinNoise.noise(noiseScale);

  return {
      // get the last point and the next point
      step: function() {
          var t = noise(x, y) * Math.PI * 5;
          var x1 = x,
              y1 = y;
          x = x + stepLength * Math.cos(t);
          y = y + stepLength * Math.sin(t);
          return {
              x1: x1,
              y1: y1,
              x2: x,
              y2: y
          }
      }
  }
}



//PERLIN CURVES 1

//PERLIN CURVES 2

function PerlinCurves2(noise){


  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 960;
  canvas.height = 500;
  
  var context = canvas.getContext('2d');

  context.fillColor = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  var width = canvas.width,
  height = canvas.height,
  noiseScale = noise,
  actorStepLength = 1,
  numActors = 10000,
  step = 0,
  steps = 500;

  var actors = [];
  for(var i = 0; i < numActors; i++) {
      actors.push(actor2(width, height, noiseScale, actorStepLength));
  }

  var opacity = easeInOut(steps);

  d3.timer(function() {
    if(++step > steps) {
        console.log("done with animation");
        return true;
    }
    context.lineWidth = 0.5;
    context.globalCompositeOperation = 'lighter';
    context.beginPath();
    for(var i in actors) {
        var a = actors[i];
        var ln = a.step();
        var alpha = 0.3*opacity.get();
        context.strokeStyle = "rgba(110, 180, 49, " + alpha + ")";
        context.moveTo(ln.x1, ln.y1);
        context.lineTo(ln.x2, ln.y2);
    }
    context.stroke();
    opacity.step();
  });

}


function actor2(width, height, noiseScale, stepLength) {

  var x = Math.random() * width,
      y = Math.random() * height,
      z = Math.random() * 15;

  var noise = perlinNoise.noise(noiseScale);

  return {
      // get the last point and the next point
      step: function() {
          var t = 24 * noise(x, y, z)
          t = (t - Math.floor(t)) * 2 * Math.PI;
          var x1 = x,
              y1 = y;
          x = x + stepLength * Math.cos(t);
          y = y + stepLength * Math.sin(t);
          return {
              x1: x1,
              y1: y1,
              x2: x,
              y2: y
          }
      }
  }
}

// PERLIN CURVES 2

function easeInOut(steps) {
  var n = 0;
  var val = 0;
  return {
      step:
          function() {
              val = 0.5*(1-Math.cos(2 * Math.PI * (n++) / steps));
          },
      get:
          function() {
              return val;
          }
  };
}

//SIMPLE PERLIN NOISE

function PerlinNoiseModifyed(){

  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 1024;
  canvas.height = 768;
  
  var ctx = canvas.getContext('2d');
  
  var image = ctx.createImageData(canvas.width, canvas.height);
  var data = image.data;
  
  var start = Date.now();
  
  for (var x = 0; x < canvas.width; x++) {
    //if (x % 100 == 0) {
    //  noise.seed(Math.random());
    //}
    for (var y = 0; y < canvas.height; y++) {
      var value = Math.abs(noise.perlin2(x / 100, y / 100));
      value *= 256;
  
      var cell = (x + y * canvas.width) * 4;
      data[cell] = data[cell + 1] = data[cell + 2] = value;
      //data[cell] += Math.max(0, (25 - value) * 8); // Pone en rojo las zonas en que el value es menor que 25
      data[cell + 3] = 255; // alpha.
    }
  }
  
  /* // Benchmark code.
  start = Date.now();
  for (var x = 0; x < 10000; x++) {
    for (var y = 0; y < 10000; y++) {
      noise.simplex2(x / 50, y/50);
    }
  }*/
  var end = Date.now();
  
  ctx.fillColor = 'black';
  ctx.fillRect(0, 0, 100, 100);
  ctx.putImageData(image, 0, 0);
  
  
  ctx.font = '16px sans-serif'
  ctx.textAlign = 'center';
  ctx.fillStyle = "#ff0000";
  ctx.fillText('Rendered in ' + (end - start) + ' ms', canvas.width / 2, canvas.height - 20);
  
  if(console) {
    console.log('Rendered in ' + (end - start) + ' ms');
  }


}

//Simplex and perlin 

function drawNoise(fn) {

  var height = 0;

  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 1024;
  canvas.height = 768;
  
  var ctx = canvas.getContext('2d');
  
  var image = ctx.createImageData(canvas.width, canvas.height);
  var data = image.data;

  var start = Date.now();
  // Cache width and height values for the canvas.
  var cWidth = canvas.width;
  var cHeight = canvas.height;

  var max = -Infinity, min = Infinity;
  var noisefn = fn === 'simplex' ? noise.simplex3 : noise.perlin3;

  for (var x = 0; x < cWidth; x++) {
    for (var y = 0; y < cHeight; y++) {
      var value = noisefn(x / 50, y / 50, height);

      if (max < value) max = value;
      if (min > value) min = value;

      value = (1 + value) * 1.1 * 128;

      var cell = (x + y * cWidth) * 4;
      data[cell] = data[cell + 1] = data[cell + 2] = value;
      //data[cell] += Math.max(0, (25 - value) * 8);
      data[cell + 3] = 255; // alpha.
    }
  }

  var end = Date.now();

  ctx.fillColor = 'black';
  ctx.fillRect(0, 0, 100, 100);
  ctx.putImageData(image, 0, 0);

  ctx.font = '16px sans-serif'
  ctx.textAlign = 'center';
  ctx.fillText(fn + ' rendered in ' + (end - start) + ' ms', cWidth / 2, cHeight - 20);

  if(console) {
    console.log(fn + ' rendered in ' + (end - start) + ' ms', 'range: ' + min + ' to ' + max);
  }

  //height += 0.05;
  //requestAnimationFrame(drawFrame);
}

