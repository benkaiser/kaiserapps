var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');

w = window.innerWidth;
h = window.innerHeight;

canvas.width = w;
canvas.height = h;

var mousex = 0;
var mousey = 0;

var hue = 0;
var hueVariance = .05;

var mx = 3;
var my = 0;

var objects = new Array();

// setup FizzyText
var DatDotGuiData = function() {

};
// editable by user
var data = new DatDotGuiData();


function create(size, distCenter){
  var tmp = {
    x: w/2,
    y: h/2,
    l: .5,
    a: Math.random(),
    am: .001 * Math.random(),
    aLim: (Math.random()/2)+.5,
    aBack: false,
    blurSize: 100,
    speed: Math.random()/2+.5,
    size: size || 0,
    distCenter: distCenter || Math.random() * 1,
    angle: Math.random() * Math.PI * 180,
    angleVel: Math.random() * .001

  }
  objects.push(tmp);

  if(tmp.am > .01 || tmp.aLim < .5){
    console.log(tmp.am + " - " + tmp.aLim);
  }
}

function update(modifier) {

  if(Math.random() < .1){
    create();
  }

  hue += .0001;

  if(hue > 1){
    hue = hue % 1.0;
  }

  // loop the objects to update their positions
  for(i in objects){
    var obj = objects[i];

    // Update size
    obj.size += obj.distCenter/2000/8;

    // Update angle
    obj.angle += obj.angleVel;

    // Update Center Distance
    obj.distCenter += obj.distCenter/1000;

    // Determin alpha move
    if(obj.aBack == false){
      obj.a += obj.am;
    } else {
      obj.a -= obj.am;

      if(obj.a < obj.am*2){
        obj.aBack = false;
      }
    }

    if(obj.a > obj.aLim){
      obj.aBack = true;
    }


    // Optomisations
    if (obj.distCenter > ((h > w)? h : w)) {
      objects.splice(i, 1);
      continue;
    }
  }
};

function updateNoDraw(){
  create();

  for(i in objects){
    objects[i].size += objects[i].distCenter/2000;
    objects[i].distCenter += objects[i].distCenter/120;
  }
}

function render() {
  // wipe the canvas
  ctx.fillStyle = rgbToHex(hslToRgb(hue, 1, .05));
  ctx.fillRect(0,0,10000,100000);

  // loop the objects for rendering
  for(i in objects){
    var obj = objects[i];

    var x = obj.distCenter * Math.cos(obj.angle);
    var y = obj.distCenter * Math.sin(obj.angle);

    col = hslToRgb((hue+hueVariance)%1.0, 1, .5);

    drawCircle(ctx, rgbToRgba(col, obj.a), x + (w/2), y + (h/2), obj.size, 1, rgbToRgba(col, obj.a));
  }
};

function main() {
  var now = Date.now();
  var delta = now - then;

  // call update and render
  update(delta / 1000);
  render();

  then = now;
};


// HOW TO GET THE JSON STRING OF ALL OBJECTS
for(var x = 0; x < 1000; x++){
  updateNoDraw();
}

render();
var then = Date.now();

// instead of setInterval(main, 16), is more effiecient for animating
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
(function animloop(){
  requestAnimFrame(animloop);
  main();
})();

// onresize change the canvas size
$(window).resize(function() {
  w = document.body.clientWidth;
  h = window.innerHeight;
  canvas.height = h;
  canvas.width = w;
});

// do some action on click of the document
$("#canvas").click(function(e){
     //create(e.pageX, e.pageY);
});

// when the mouse moves get its position (for interactivity)
$(document).mousemove(function(e){
  mousex = e.pageX;
  mousey = e.pageY;
});

/* DAT.GUI stuff */

/* uncomment code to initialize dat.gui variables
window.onload = function() {

  var gui = new dat.GUI();

  //gui.addColor(data, 'color').listen();
  //gui.add(data, 'clear').listen();

};
*/

/* UTILITY FUNCTIONS */

// colour converting functions, used to create random color (see update function)
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return {r: parseInt(r * 255),g: parseInt(g * 255),b: parseInt(b * 255)};
}

function rgbToHex(x) {
    return "#" + ((1 << 24) + (x.r << 16) + (x.g << 8) + x.b).toString(16).slice(1);
}

// utility function to draw a circle
function drawCircle(ctx, fillColor, x, y, radius, strokeWidth, strokeColor){
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.arc(x,y,radius,0,Math.PI*2,false);
  ctx.closePath();
  if(strokeWidth != 0){
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle=strokeColor;
    ctx.stroke();
  }
  ctx.fill();
}

function rgbToRgba(rgbCol, a){
  return "rgba("+rgbCol.r+","+rgbCol.g+","+rgbCol.b+","+a+")";
}
