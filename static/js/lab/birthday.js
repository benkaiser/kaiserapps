// get the GET variables
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// share link generation
function updatelink(){
  link = window.location.origin + "/lab/birthday?name="
    +encodeURIComponent($("#name").val())
    +"&age="
    +encodeURIComponent($("#age").val());
  $("#link").html(link);
  $("#link").attr("href",link);
}

// fireworks animation
var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');

w = $(window).width();;
h = $(window).height();;

canvas.width = w;
canvas.height = h;
$("#canvas").css("width",w);
$("#canvas").css("height",h);

// var for if mobile
var mobile = false;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
  mobile = true;
}

// adjust to center bday message
bdheight = $("#bday").height();
$("#bday").css("margin-top","-"+(bdheight/2)+"px");
$("#bday").css("display","block");

// used to stop fireworks firing when tab not active
blur = false;
window.onblur = function() { blur = true; };
window.onfocus = function() { blur = false; };

var fireworks = new Array();

function addTimeout(){
  if(!blur){
    setTimeout(function(){startFirework(null,null);}, getSize(2, 0.5) * 1000.0);
  } else {
    setTimeout(addTimeout,1000);
  }
}
addTimeout();

function startFirework(x, y){
  if(x == null){
    addTimeout();
  }

  x = (x == null) ? document.width*Math.random() : x;
  y = (y == null) ? document.height*Math.random() : y;

  var firworkgroup = new Array();

  var speed = getSize(2,3);
  var hue = Math.random();

  var howmany = 100;
  if(mobile) {
    howmany = 10;
  }

  for(var cnt = 0; cnt < howmany; cnt++){
    var tmp = {
      x: x,
      y: y,
      r: getSize(5, 10),
      color: rgbToHex(hslToRgb(hue+(getSize(0.2,-0.1)),1,.5)),
      speed: speed,
      distance: 0,
      offsetDistance: getSize(.5,1),
      angle: getSize(Math.PI*2,0),
      a: 200,
      time: 0
    };
    firworkgroup.push(tmp);
  }

  fireworks.push(firworkgroup);
}

function getSize(seed, constant){
  return (Math.random()*seed) + constant;
}

function update(){
  for (index in fireworks) {
    for(index2 in fireworks[index]){
      c = fireworks[index][index2];
      c.distance += c.speed;
      c.time += 1;
      c.a -= 1;
      c.r = c.r * 0.999;
      if(c.a == 0 || c.y+c.r > h || c.x+c.r < 0 || c.x-c.r > w){
        fireworks[index].splice(index2,1);
        continue;
      }
    }
  }
}

function render(){
  ctx.globalAlpha=1.0;
  ctx.fillStyle = "#eee";
  ctx.fillRect(0,0,10000,100000);
  // test other
  for (index in fireworks) {
    for(index2 in fireworks[index]){
      ctx.globalAlpha=1.0;
      c = fireworks[index][index2];
      calcX = (c.x)+(c.distance * (c.offsetDistance) * Math.cos(c.angle));
      calcY = (c.y)+(c.distance * (c.offsetDistance) * Math.sin(c.angle));
      drawCircle(ctx, c.color, calcX, calcY + getGravity(c.time), c.r, 5, "#FFF", c.a/100.0);
    }
  };
}

function getGravity(time){
  return Math.pow(time,2) / 70;
}

function main() {
  update();
  render();
};

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

$(window).resize(function() {
  w = $(window).width();
  h = $(window).height();
  canvas.height = h;
  canvas.width = w;
  bdheight = $("#bday").height();
  $("#bday").css("margin-top","-"+(bdheight/2)+"px");
});

$(document).click(function(e){
    startFirework(e.pageX, e.pageY);
});

$(document).ready(function(e){
  urlVars = getUrlVars();
  if(urlVars.hasOwnProperty('age') && urlVars.hasOwnProperty('name')){
    $("#formItem").remove();
    var age = urlVars.age;
    var ending = "th";
    if(age.substr(age.length-1, age.length) == '1'){
      ending = "st";
    } else if(age.substr(age.length-1, age.length) == '2'){
      ending = "nd";
    } else if(age.substr(age.length-1, age.length) == '3'){
      ending = "rd";
    }
    $("#bday").html("Happy " + urlVars.age + ending + " Birthday " + urlVars.name + "!");
  } else {
    $("#birthdayItem").remove();
    $('.modal').modal('show');
  }
});

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

// CIRCLE
function drawCircle(ctx, fillColor, x, y, radius, strokeWidth, strokeColor, alpha){
  ctx.globalAlpha=alpha;
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
