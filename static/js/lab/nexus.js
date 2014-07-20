var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');

w = window.innerWidth;
h = window.innerHeight;

canvas.width = w;
canvas.height = h;

var mousex = 0;
var mousey = 0;

var colors = new Array(0, .33, .66, .18);

var objects = new Array();

var cnt = 0;

var margin = 50;
var trailLength = 2000;
var speed = 5;
var speedMin = 5;
var sizeConst = 20;
var minSize = 2;

var light = .5;
// setup FizzyText
var DatDotGuiData = function() {

};
// editable by user
var data = new DatDotGuiData();

function getRandPoint(){
  var rand = Math.random();
  if(rand < .25){
    return {x: -margin, y: Math.random()*h, mx: Math.random()*speed+speedMin, my: 0};
  } else if(rand < .5){
    return {x: Math.random()*w, y: -margin, mx: 0, my: Math.random()*speed+speedMin}
  } else if(rand < .75){;
    return {x: w+margin, y: Math.random()*h, mx: -Math.random()*speed-speedMin, my: 0};
  } else {
    return {x: Math.random()*w, y: h+margin, mx: 0, my: -Math.random()*speed-speedMin}
  }
}

function createRandom(){
  point = getRandPoint();
  var tmp = {
    x: point.x,
    y: point.y,
    mx: point.mx,
    my: point.my,
    color: colors[Math.floor(colors.length*Math.random())],
    size: Math.random()*sizeConst+minSize,
    trail: null
  };
  objects.push(tmp);
}

function createTrail(obj){
  var tmp;
  if(obj.mx > 0){
    tmp = {
      x1: obj.x,
      y1: obj.y,
      x2: obj.x - calcTrailLength(obj.size),
      y2: obj.y + obj.size,
      gradient: null
    };
  } else if(obj.mx < 0){
    tmp = {
      x1: obj.x + obj.size,
      y1: obj.y,
      x2: obj.x + calcTrailLength(obj.size),
      y2: obj.y + obj.size,
      gradient: null
    };
  } else if(obj.my > 0){
    tmp = {
      x1: obj.x,
      y1: obj.y,
      x2: obj.x + obj.size,
      y2: obj.y - calcTrailLength(obj.size),
      gradient: null
    };
  } else {
    tmp = {
      x1: obj.x,
      y1: obj.y + obj.size,
      x2: obj.x + obj.size,
      y2: obj.y + calcTrailLength(obj.size),
      gradient: null
    };
  }
  tmp.gradient = createGradient(tmp, obj);
  return tmp;
}

function createGradient(obj, parent){
  var gradient;
  if(parent.my == 0){
    gradient = ctx.createLinearGradient(obj.x1, obj.y1, obj.x2, obj.y1);
    gradient.addColorStop(0, rgbToHex(hslToRgb(parent.color, 1, .5)));
    gradient.addColorStop(1, "rgba(255,255,255,0)");
  } else {
    gradient = ctx.createLinearGradient(obj.x1, obj.y2, obj.x1, obj.y1);
    gradient.addColorStop(1, rgbToHex(hslToRgb(parent.color, 1, .5)));
    gradient.addColorStop(0, "rgba(255,255,255,0)");
  }

  return gradient;
}

function calcTrailLength(size){
  return size * 10;
}

function shuffle(o){
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function create(x, y){
  speed = Math.random()*speed+speedMin;
  size = Math.random()*sizeConst+minSize;
  newColors = shuffle(colors);
  var tmp = {
    x: x,
    y: y,
    mx: speed,
    my: 0,
    color: newColors[0],
    size: size
  };
  objects.push(tmp);
  var tmp = {
    x: x,
    y: y,
    mx: -speed,
    my: 0,
    color: newColors[1],
    size: size
  };
  objects.push(tmp);
  var tmp = {
    x: x,
    y: y,
    mx: 0,
    my: speed,
    color: newColors[2],
    size: size
  };
  objects.push(tmp);
  var tmp = {
    x: x,
    y: y,
    mx: 0,
    my: -speed,
    color: newColors[3],
    size: size
  };
  objects.push(tmp);
}

function update(modifier) {

  if(cnt++ % 3 == 0){
    createRandom();
  }

  // loop the objects to update their positions
  for(i in objects){
    var obj = objects[i];

    obj.x += obj.mx;
    obj.y += obj.my;

    if(Math.random() < .001){
      create(obj.x, obj.y);
    }

    obj.trail = createTrail(obj);

    var offset = trailLength/obj.size + margin;

    if(	obj.x + obj.mx > w+offset || /* going right condition */
      obj.x + obj.mx < -offset || /* going left condition */
      obj.y + obj.my > h+offset || /* going down condition */
      obj.y + obj.my < -offset /* going up condition */){
      // remove object
      objects.splice(i,1);
    }
  }

  light += (Math.random()/100)-(Math.random()/100);
  if(light > 1){
    light = 1;
  } else if (light < 0){
    light = 0;
  }
};

function render() {
  // wipe the canvas
  ctx.fillStyle = "#44bbff";
  ctx.fillRect(0,0,10000,100000);

  // loop the objects for rendering
  for(i in objects){
    var obj = objects[i];

    if(obj.trail == undefined || obj.trail == null){
      continue;
    }

    ctx.fillStyle = obj.trail.gradient;
    ctx.shadowBlur = 0;

    ctx.fillRect(obj.trail.x1, obj.trail.y1, obj.trail.x2 - obj.x, obj.trail.y2 - obj.y);

    /*
    ctx.shadowColor = rgbToHex(hslToRgb(obj.color, 1, .7));
    ctx.shadowBlur = obj.size*1;
    ctx.fillStyle = rgbToHex(hslToRgb(obj.color, 1, .5));

    ctx.fillRect(obj.x, obj.y, obj.size, obj.size);*/
  }
  ctx.shadowColor = "#FFF";
  ctx.shadowBlur = 20;
  drawCircle(ctx, "rgba(230,230,230,1)", mousex, mousey, 10, 0, "rgba(0,0,0,0)");
};

function main() {
  var now = Date.now();
  var delta = now - then;

  // call update and render
  update(delta / 1000);
  render()

  then = now;
};


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
     create(e.pageX, e.pageY);
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
