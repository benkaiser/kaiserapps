/* Backgrid class
 * Author: Benjamin Kaiser
 * Website: kaiserapps.com
 * Copyright of Benjamin Kaiser 2012
*/

function Backgrid (centerDivId, backgroundColor, baseCol, Size, radius, spd, spacing, vibRan) {
  var cdiv = centerDivId;
  var bc = backgroundColor;
  var baseSquareCol = hexToRgb(baseCol);
  var size = Size;
  var mRad = radius;
  var speed = spd / 100.0;
  var space = spacing;
  var vibrancy = typeof vibRan !== 'undefined' ? vibRan : 1.0;

  var canvas = $("<canvas></canvas>").attr({ id :"backGridCanvas" }).get(0);
  var ctx = canvas.getContext('2d');
  var w = document.body.clientWidth;
  var h = window.innerHeight;
  var xsize;
  var ysize;

  var mousex = w/2, mousey = h/2;
  var grid = [];
  var poses = [];
  var colcount = 0.0;
  var didMoveMouse = false;
  var col;

  canvas.width = w;
  canvas.height = h;
  canvas.style.position = "fixed";
  canvas.style.zIndex = "-1";
  canvas.style.margin = "0";
  canvas.style.padding = "0";
  var tmpMargin = $("#"+cdiv).css("margin-top");
  canvas.style.marginTop = (tmpMargin == 0)? 0 : "-"+tmpMargin;

  $("#"+cdiv).before(jQuery(canvas));
  $("#"+cdiv).css("z-index","1");

  var refreshgrid = function(){
    grid = new Array();

    xsize = x = Math.floor(w / (size + space));
    ysize = y = Math.floor(h / (size + space));

    xbase = Math.floor((w % (size+space)) / 2);
    ybase = Math.floor((h % (size+space)) / 2);

    for(cntx = 0; cntx < x; cntx++){
      for(cnty = 0; cnty < y; cnty++){
        var color;
        if(col !== undefined){
          	color = hexToRgb(col[Math.floor(Math.random()*col.length)]);
        	} else {
          	color = hslToRgb(Math.random(), 1, .5);
        	}
        temp = {
          x: cntx,
          y: cnty,
          xpos: (cntx*size)+(space*cntx)+xbase+(space / 2),
          ypos: (cnty*size)+(space*cnty)+ybase+(space / 2),
          col: color,
          point: 0.0
        };
        grid.push(temp);
      }
    }
  }

  var timer;
  // onresize
  $(window).resize(function() {
    w = document.body.clientWidth;
    h = window.innerHeight;
    canvas.height = h;
    canvas.width = w;
    clearInterval(timer);
    timer = setTimeout(refreshgrid, 100);
  });

  // mouse co-ordinate stuff
  document.onmousemove=getMouseCoordinates;

  function getMouseCoordinates(event){
      ev = event || window.event;
      mousex = ev.pageX;
      mousey = ev.pageY - $(document).scrollTop();
      didMoveMouse = true;
  }

  this.setColArr = function(colArr) {
    col = colArr;
    return poses.length-1;
  }

  // this.baseSquareCol = function(){
  // 	return baseSquareCol;
  // }

  this.glide = function(){
    glidePos = 0;
    startGlide();
  }

  function startGlide(){
    for(i in grid){
      g = grid[i];
      if(g.y == glidePos){
        g.point = vibrancy;
      }
    }
    glidePos++;
    if(glidePos <= ysize){
      setTimeout(startGlide, 150);
    }
  }

  var update = function() {
    colcount += 0.005;

    for(var p in poses){
      p = poses[p];
      var x = mousex,y = mousey;
      if(!p.mouse){x = p.x; y=p.y;}
    }
    // move circles
    for(var i in grid){
      g = grid[i];

      g.point -= speed;

      hyp = Math.sqrt(Math.pow(g.xpos - mousex + size/2,2) + Math.pow(g.ypos - mousey + size/2,2));

      if(hyp < radius && hyp > -radius && didMoveMouse){
        g.point = vibrancy;
      }

      if(g.point < 0){
        g.point = 0;
      }
    }
    didMoveMouse = false;
  }

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

  var render = function(){
    update();

    ctx.fillStyle = bc;
    ctx.fillRect(0,0,10000,10000);

    currentColor = hslToRgb(colcount % 1.0, 1, .5);

    for(i in grid){
        g = grid[i];
        ctx.fillStyle =  getPercent(baseSquareCol, g.col, g.point);
        ctx.fillRect(g.xpos, g.ypos, size, size);
    }
  }

  var animloop = function(){;
    requestAnimFrame(animloop);
    render();
  }

  this.start = function(){
    refreshgrid();
    animloop();
  }

  this.setBackgroundColor = function(bgcolor){
    this.bc = bgcolor;
  }

  this.setCenterDivId = function(centerDivId){
    this.cdiv = centerDivId;
  }

  this.getBackgroundColor = function(){
    return this.bc;
  }

  this.getCenterDivId = function(){
    return this.cdiv;
  }
}

// utility function
function drawCircle(ctx, fillColor, x, y, radius, strokeWidth, strokeColor,blur){
    ctx.shadowBlur = radius;
    ctx.shadowColor = blur;
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

function getPercent(lower, upper, percent){
  var range = upper.pct - lower.pct;
  var pctLower = 1 - percent;
  var pctUpper = percent;
  var color = {
    r: Math.floor(lower.r * pctLower + upper.r * pctUpper),
    g: Math.floor(lower.g * pctLower + upper.g * pctUpper),
    b: Math.floor(lower.b * pctLower + upper.b * pctUpper)
  };
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
