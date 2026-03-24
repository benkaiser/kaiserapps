/* Ball in Box - bib.js
 * Author: Benjamin Kaiser
 * Website: kaiserapps.com
 * A bouncing spawn point (DVD logo style) using the Backfun particle system.
 */

var canvas = document.getElementById('canvas') || $("<canvas></canvas>").attr({ id: "canvas" }).appendTo("body").get(0);
var ctx = canvas.getContext('2d');
var w, h;
var circles = [];
var colors = ["#EF2B6F","#29E8AE","#6C28FF","#FF2855","#21E6ED"];

// Bouncing point
var ball = {
  x: 100,
  y: 100,
  vx: 3,
  vy: 2
};

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

resize();
$(window).resize(resize);

function update() {
  // Move the bouncing point
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Bounce off walls
  if (ball.x <= 0 || ball.x >= w) {
    ball.vx *= -1;
    ball.x = Math.max(0, Math.min(w, ball.x));
  }
  if (ball.y <= 0 || ball.y >= h) {
    ball.vy *= -1;
    ball.y = Math.max(0, Math.min(h, ball.y));
  }

  // Spawn particles from the bouncing point
  var color = colors[Math.floor(Math.random() * colors.length)];
  circles.push({
    x: ball.x,
    y: ball.y,
    s: Math.random() * 20 + 5,
    color: color,
    mx: Math.random() * 10 - 5,
    my: Math.random() * 10 - 5
  });

  // Move and shrink existing particles
  for (var i = circles.length - 1; i >= 0; i--) {
    var c = circles[i];
    c.x += c.mx * 0.7;
    c.y += c.my * 0.7;
    c.s -= 0.35;
    if (c.s < 1) {
      circles.splice(i, 1);
    }
  }
}

function render() {
  update();

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    ctx.shadowBlur = c.s;
    ctx.shadowColor = c.color;
    ctx.fillStyle = c.color;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.s, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }

  // Draw the bouncing point
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#fff";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 6, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;

  requestAnimationFrame(render);
}

render();
