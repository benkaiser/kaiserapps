var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');

w = window.innerWidth;
h = window.innerHeight;

canvas.width = w;
canvas.height = h;

var mousex = 0;
var mousey = 0;

var locations = new Array();

var cntr = 0;
var matchFinished = false;
var newGameClick = true;

var sW = 0, sH = 0;
var xMargin = 0; yMargin = 40;
var tMargin = 0, lMargin = 0;
var numw = 40, numh = 20;

var players = new Array();

// Array for key events
var keysDown = {};

function calcDir(code){
  for(p in players){
    p = players[p];
    if(p.up    == code && p.my != -1){p.mx =  0; p.my =  1;}
    if(p.down  == code && p.my !=  1){p.mx =  0; p.my = -1;}
    if(p.left  == code && p.mx !=  1){p.mx = -1; p.my =  0;}
    if(p.right == code && p.mx != -1){p.mx =  1; p.my =  0;}
  }
}

function calcSize(){
  sW = Math.floor((w-xMargin) / numw);
  sH = Math.floor((h-yMargin) / numh);

  tMargin = Math.floor(h-(sH*numh));
  lMargin = Math.floor(w-(sW*numw));
}



function init(){

  players = new Array();

  // player 1
  var tmp = {
    x: numw/4,
    y: numh/2,
    color: "#14CCCA",
    name: "Blue",
    down: 87,up: 83,left: 65,right: 68,
    mx: 1,
    my: 0,
    dead: false,
    lives: 10
  };
  players.push(tmp);
  // player 2
  tmp = {
    x: numw/4*3,
    y: numh/2,
    color: "#FF00C0",
    name: "Pink",
    down: 38,up: 40,left: 37,right: 39,
    mx: -1,
    my: 0,
    dead: false,
    lives: 10
  };
  players.push(tmp);
}

var reset = function () {

  for(p in players){
    if(players[p].lives == -1){
      $("#center").html(players[p].name + " Lost");
      $("#subtitle").html("click to start a new match");
      newGameClick = true;
      return;
    }
  }

  locations = new Array();
  for(var x = 0; x < numw; x++){
    locations.push(new Array());
    for(var y = 0; y < numh; y++){
      locations[x].push(-1);
    }
  }

  players[0].x = numw/4,
  players[1].x = numw/4*3;
  players[0].y = numh/2,
  players[1].y = numh/2;
  players[0].mx = 1,
  players[1].mx = -1;
  players[0].my = 0,
  players[1].my = 0;
  locations[players[0].x][players[0].y] = 0;
  locations[players[1].x][players[1].y] = 1;

  // reset other stuff
  matchFinished = false;
  $("#center").html("");
  $("#subtitle").html("");
}

function checkCols() {
  var living = true;
  var cntDead = 0;
  for(p in players){
    p = players[p];
    var newx = p.x+p.mx;
    var newy = p.y+p.my;
    // the locations test has to be at the end so you dont do an out of bounds death
    if(newx > numw-1 || newy > numh-1 || newx < 0 || newy < 0  || locations[newx][newy] != -1){
      p.dead = true;
      living = false;
      p.lives--;
      cntDead++;
      $("#center").html(p.name +" lost a life");
    }
  }
  if(cntDead == 2){
    $("#center").html("Draw!");
    for(p in players){
      players[p].lives++;
    }
  }
  return living;
}

var update = function (modifier) {

  if(cntr++ % 10 == 0 && matchFinished == false && newGameClick == false){

    if(checkCols()){
      for(p in players){
        var index = p;
        p = players[p];
        // move the players
        p.x += p.mx;
        p.y += p.my;
        // draw position
        locations[p.x][p.y] = index;
      }
    } else {
      matchFinished = true;
      setTimeout(reset, 1000);
    }
  }

};

var render = function () {
  // wipe the canvas
  ctx.fillStyle = "#FFF";
  ctx.fillRect(0,0,10000,100000);

  // paint board
  ctx.fillStyle = "#FFD919";
  ctx.fillRect(lMargin/2, tMargin/2, numw*sW, numh*sH);

  for(var x = 0; x < numw; x++){
    for(var y = 0; y < numh; y++){
      if(locations[x][y] != -1){
        ctx.fillStyle = players[locations[x][y]].color;
        ctx.fillRect(Math.floor(lMargin/2)+x*sW,Math.floor(tMargin/2)+y*sH,sW,sH);
      }
    }
  }

  var sArr = new Array();
  for(p in players){
    sArr.push(players[p].name + ": " + players[p].lives);
  }
  var livStr = sArr[0] + " - " + sArr[1];

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.textBaseline = "bottom"
  ctx.fillText(livStr,lMargin/2,tMargin/2);

};

function drawCircle(ctx, fillColor, x, y, radius, strokeWidth, strokeColor){
  ctx.fillStyle = colorToHex("rgb("+fillColor[0].toFixed(0)+","+fillColor[1].toFixed(0)+","+fillColor[2].toFixed(0)+")");
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
reset();
calcSize();
render();
$("#center").html("SNAFU!");
$("#subtitle").html("click to start (p1. wasd p2. arrow keys)");
var then = Date.now();
setInterval(main, 1000/60);

// onresize
$(window).resize(function() {
  w = document.body.clientWidth;
  h = window.innerHeight;
  canvas.height = h;
  canvas.width = w;
  calcSize();
});

// movement keys
addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
  calcDir(e.keyCode);
}, false);
addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// stop up and down keys propogating
$(window).delegate('*', 'keydown', function (evt){if(evt.keyCode == 38 || evt.keyCode == 40){return false;}});

/* UTILITY FUNCTIONS */

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

  return [r * 255, g * 255, b * 255];
}

function colorToHex(color) {
  if (color.substr(0, 1) === '#') {
    return color;
  }
  var digits = /(.*?)rgb\((\d+),(\d+),(\d+)\)/.exec(color);

  var red = parseInt(digits[2]);
  var green = parseInt(digits[3]);
  var blue = parseInt(digits[4]);

  var rgb = blue | (green << 8) | (red << 16);
  return digits[1] + '#' + rgb.toString(16);
};

document.onclick=checkStartNew;
document.onmousemove=getMouseCoordinates;

function getMouseCoordinates(event){
  ev = event || window.event;
  mousex = ev.pageX;
  mousey = ev.pageY;
}

function checkStartNew(event){
  if(newGameClick == true){
    init();
    reset();
    newGameClick = false;
  }
}
