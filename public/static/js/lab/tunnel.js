var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');

w = window.innerWidth;
h = window.innerHeight;

canvas.width = w;
canvas.height = h;

var mousex = 0;
var mousey = 0;

var squares = new Array();

var cntr = 0;

var movx = 0;
var movy = 0;

// setup FizzyText
var FizzyText = function() {
  this.randCol = false;
  this.squareOrCircle = false;
};
// editable by user
var data = new FizzyText();

function init(){
  ctx.strokeStyle = "#FFF";
  ctx.lineWidth = 1;
}

var hue;

function createSquare(){

  hue = 0.0;
  if(squares.length > 0){
    hue = (squares[squares.length-1].h+(Math.random()/10)) % 1.0;
  }

  var multiple = 10;

  movx += Math.random() * multiple - multiple/2;
  movy += Math.random() * multiple - multiple/2;

  var col;
  if(data.randCol){
    col = rgbToHex(hslToRgb(Math.random(), 1, .5));
  } else {
    col = rgbToHex(hslToRgb(hue, 1, .5));
  }

  var square = {
    s: 3,
    c: col,
    h: hue,
    offx: movx,
    offy: movy
  }

  squares.push(square);

}

var update = function (modifier) {

  if(cntr++ % 3 == 0){
    createSquare();
  }

  for(i in squares){
    square = squares[i];

    square.s += square.s/10;

    if(square.s > h*3 && square.s > w*3){
      squares.splice(i,1);
    }
  }

};

var render = function () {
  // wipe the canvas
  ctx.fillStyle = "#FFF";
  ctx.fillRect(0,0,10000,100000);

  for(i in squares){
    square = squares[i];

    var x, y, w2, h2;
    x = (w-square.s+(square.offx))/2;
    y = (h-square.s+(square.offy))/2;
    w2 = square.s;
    h2 = square.s;

    if(data.squareOrCircle){
      ctx.fillStyle = square.c;
      ctx.fillRect(x,y,w2,h2);
      ctx.strokeRect(x,y,w2,h2);
    } else {
      drawCircle(ctx, square.c, (w-square.offx)/2,(h-square.offy)/2, square.s, 1, "#fff");
    }
  }

  if(squares.length > 0){
    //drawLines();
  }

};

function drawLines(){
  z = squares[0];

  ctx.beginPath();
  ctx.moveTo((w-z.s)/2,(h-z.s)/2);
  ctx.lineTo(w/2,h/2);
  ctx.lineTo((w+z.s)/2,(h-z.s)/2);
  ctx.moveTo((w-z.s)/2,(h+z.s)/2);
  ctx.lineTo(w/2,h/2);
  ctx.lineTo((w+z.s)/2,(h+z.s)/2);
  ctx.closePath();
  ctx.stroke();
}

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

var main = function () {
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

  gui.add(data,'randCol').listen();
  gui.add(data,'squareOrCircle').listen();

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
