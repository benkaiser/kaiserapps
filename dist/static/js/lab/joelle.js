var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
var fx = document.getElementById('sound');
w = window.innerWidth;
h = window.innerHeight;
canvas.width = w;
canvas.height = h;

var all_counter
var iteration;
var love_heart_size;
var factor;
var grd;
var spacing;
var speed;
var text;
var mousex;
var mousey;
var clickLocations = [];

function init(){
  all_counter = 0;
  love_heart_size = 20;
  spacing = love_heart_size * 5;
  num_accross = w / spacing;
  speed = 1;
  text = 'I love you Joelle, happy 9 months';

  grd = ctx.createLinearGradient(0,0,w,h);
  grd.addColorStop(0,"#ff99ff");
  grd.addColorStop(0.5,"#ffccff");
  grd.addColorStop(1,"#ff99ff");
}
init();

function update(){
  all_counter += 1;
  iteration = all_counter % (spacing);
}

function render(){
  // background
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // draw the text
  ctx.font = '700 ' + w / 20 + 'px \'Indie Flower\', Helvetica';
  ctx.fontWeight = 800;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';
  ctx.fillText(text.substr(0, Math.max(0, all_counter / 10 - 2)), w / 2, h / 2);

  // draw all the hearts
  for(var x = -1; x < num_accross + 2; x++){
    for(var y = -1; y < num_accross + 2; y++){
      drawHeart(ctx, "rgba(255, 255, 255, 0.2)", x * spacing + iteration * speed, y * spacing + iteration * speed, love_heart_size, 0, 0);
    }
  }

  for (var x = 0; x < clickLocations.length; x++) {
    drawHeart(ctx, "rgba(255, 0, 0, 0.7)", clickLocations[x].x, clickLocations[x].y, love_heart_size * 2, 0, 0);
  }

  // draw a heart on the cursor
  drawHeart(ctx, "rgba(255, 0, 0, 0.5)", mousex, mousey, love_heart_size * 2, 0, 0);
}


function main(){
  update();
  render();
}

// lifecycle
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();
(function animloop(){
  requestAnimFrame(animloop);
  main();
})();

// onresize
$(window).resize(function() {
  w = document.body.clientWidth;
  h = window.innerHeight;
  canvas.height = h;
  canvas.width = w;
  init();
});

// on mousemove
$(document).mousemove(function(e){
  mousex = e.pageX;
  mousey = e.pageY;
});

// onclick
$(document).click(function(e){
  clickLocations.push({x: e.pageX, y: e.pageY});
});

// util functions

function drawCircle(ctx, fillColor, x, y, radius, strokeWidth, strokeColor){
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.arc(x,y,radius,0,Math.PI*2,false);
  ctx.closePath();
  if(strokeWidth !== 0){
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle=strokeColor;
    ctx.stroke();
  }
  ctx.fill();
}

function drawHeart(ctx, fillColor, x, y, m, rot, strokeWidth, strokeColor){
  // color
  ctx.fillStyle = fillColor;
  // set origin at x and y
  ctx.save();
  ctx.translate(x + (7/10 * m), y - (4/10 * m));
  ctx.rotate( (225 + rot)*Math.PI/180 );
  // start drawing
  ctx.beginPath();
  ctx.moveTo(-m, 0);
  ctx.arc(0, 0, m, 0, Math.PI, false);
  ctx.lineTo(m, 0);
  ctx.arc(m, -m, m, Math.PI * 90 / 180, Math.PI * 270 / 180, true);
  ctx.lineTo(m, -m * 2);
  ctx.lineTo(-m, -m * 2);
  ctx.lineTo(-m, 0);
  ctx.closePath();
  if(strokeWidth !== 0){
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle=strokeColor;
    ctx.stroke();
  }
  ctx.fill();
  // restore original origin
  ctx.restore();
}
