var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');

w = window.innerWidth;
h = window.innerHeight;

canvas.width = w;
canvas.height = h;

var mousex = 0;
var mousey = 0;

var objects = new Array();

var cntr = 0;

var curCol = "#FFF";

// setup FizzyText
var FizzyText = function() {
  this.color = "#FFFFFF";
  this.clear = function() {
    objects = new Array();
  }
};
// editable by user
var data = new FizzyText();

function init(){
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  changeColor();
}

function changeColor(){
  curCol = rgbToHex(hslToRgb(Math.random(), 1, .5));
}

var vibVelAcc = 0;
var friction = .05;
var vibVel = 0;
var vibPos = 0;

function create(x,y){

  var obj = {
    x: x,
    y: y,
    c: curCol,
    vibPos: 4,
    vibVel: 0,
    vibVelAcc: .4
  }

  changeColor();

  objects.push(obj);
}

function update(modifier) {

  for(i in objects){
    obj = objects[i];

    var mul = 5, tak = 2.5;
    //obj.x += Math.random()*mul-tak;
    //obj.y += Math.random()*mul-tak;


    if(i != 0){
      obj2 = objects[parseInt(i)-1];

      if(obj2.vibPos > 0){
        obj2.vibVel -= obj2.vibVelAcc;
      } else {
        obj2.vibVel += obj2.vibVelAcc;
      }

      if(obj2.vibVel > 0){
        obj2.vibVel -= friction;
      } else {
        obj2.vibVel += friction;
      }


      var xlength = (obj2.x - obj.x);
      var ylength = (obj2.y - obj.y);
      length = Math.abs(Math.sqrt(Math.pow(xlength,2) + Math.pow(ylength,2)));

      var div = 2000;
      var val = .1;
      if(obj2.vibVel < val && obj2.vibVel > -(val) && obj2.vibPos > -(val) && obj2.vibPos < val){
        obj2.vibVelAcc = 0;
        obj2.vibVel = 0;
        obj2.vibPos = 0;
      }

      obj2.vibPos += obj2.vibVel/10;
    }


  }



};

function render() {
  // wipe the canvas
  ctx.fillStyle = data.color;
  ctx.fillRect(0,0,10000,100000);

  var lastx = -100, lasty = -100, lastcol = "#FFF";
  for(i in objects){
    obj = objects[i];

    if(objects.length > parseInt(i)+1){
      obj2 = objects[parseInt(i)+1];

      ctx.beginPath();
      ctx.moveTo(obj.x,obj.y);

      if(obj2.vibPos != 0){
        var vibPercent = obj.vibPos / 20;

        var xlength = (obj2.x - obj.x);
        var ylength = (obj2.y - obj.y);

        var middlex = obj2.x - (xlength / 2);
        var middley = obj2.y - (ylength / 2);
        var length = Math.sqrt(Math.pow(xlength,2) + Math.pow(ylength,2));

        var angle = Math.atan(ylength / xlength);

        var nmiddlex = middlex+(Math.sin(angle)*length*vibPercent);
        var nmiddley = middley-(Math.cos(angle)*length*vibPercent);


        ctx.quadraticCurveTo(nmiddlex,nmiddley,obj2.x,obj2.y);

      } else {

        ctx.lineTo(obj2.x,obj2.y);

      }

      ctx.strokeStyle = obj2.c;
      ctx.stroke();

      //drawCircle(ctx, "#FFF", nmiddlex, nmiddley, 15, 5, "white"); draw the quadratic control point
    }

    if(objects.length != parseInt(i)+1){
      drawCircle(ctx, obj.c, obj.x, obj.y, 10, 5, "white");
    } else {
      lastx = obj.x;
      lasty = obj.y;
      lastcol = obj.c;
    }
  }

  if(lastx != -100){
    ctx.beginPath();
    ctx.moveTo(lastx,lasty);
    ctx.lineTo(mousex,mousey);
    ctx.strokeStyle = curCol;
    ctx.stroke();
    drawCircle(ctx, lastcol, lastx, lasty, 10, 5, "white");
  }

  drawCircle(ctx, curCol, mousex, mousey, 10, 5, "white");
};

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

function main() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render()

  then = now;
};


init();
render();
var then = Date.now();
setInterval(main, 1000/60);

// onresize
$(window).resize(function() {
  w = document.body.clientWidth;
  h = window.innerHeight;
  canvas.height = h;
  canvas.width = w;
});

/* DAT.GUI stuff */

window.onload = function() {

  var gui = new dat.GUI();

  gui.addColor(data, 'color').listen();
  gui.add(data, 'clear').listen();

};


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

$("#canvas").click(function(e){
     create(e.pageX, e.pageY);
});

$(document).mousemove(function(e){
  mousex = e.pageX;
  mousey = e.pageY;
});
