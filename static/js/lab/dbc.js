var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');

w = window.innerWidth;
h = window.innerHeight;

canvas.width = w;
canvas.height = h;

cntr = 0;

currentColor = Math.random();

var crg = new Array();

var reset = function () {
	for(var x = 0; x < 10; x++){
		crg[x] = new Array();
		crg[x][0] = {
			x: w / 10 * x + w / 20,
			y: h,
			xmov: Math.random()-0.5,
			s: h/1000,
			color: hslToRgb(currentColor,1,.5)
		};
	}
}

var update = function (modifier) {
	// MOVEMENT CODE
	var movConst = 10;

	if(cntr++ % 2 === 0){
		for(var CircleArr in crg){
			createCircle(CircleArr);
		}
	}

	for(var CircleArr in crg){
		x = CircleArr;
		CircleArr = crg[CircleArr];
		for(var circle in CircleArr){
			circle = CircleArr[circle];
			circle.x += circle.xmov;

			if(x % 2 == 0){
				circle.y -= Math.random()*movConst;
			} else {
				circle.y += Math.random()*movConst;
			}
			circle.s += Math.random()*.5;
		}
		var margin = h/100;
		while(CircleArr.length > 2 && (CircleArr[0].x + CircleArr[0].s > w+margin || CircleArr[0].x - CircleArr[0].s < 0-margin || CircleArr[0].y + CircleArr[0].s > h+margin || CircleArr[0].y + CircleArr[0].s < 0-margin) ){
			CircleArr.shift();
		}
	}



};

function createCircle(interval){
	currentColor += Math.random();

	tmp = crg[interval][crg[interval].length-1];

	if(interval % 2 === 0){
		crg[interval].push({
			x: w / 10 * parseInt(interval) + w / 20,
			y: h,
			s: Math.random()*h/1000,
			color: hslToRgb(currentColor % 1.00,1,.5),
      xmov: Math.random() - 0.5
		});
	} else {
		crg[interval].push({
			x: w / 10 * parseInt(interval) + w / 20,
			y: 0,
			s: Math.random()*h/1000,
			color: hslToRgb(currentColor % 1.00,1,.5),
      xmov: Math.random() - 0.5
		});
	}
}

var render = function () {
	// wipe the canvas
	ctx.fillStyle = "#FFF";
	ctx.fillRect(0,0,10000,100000);

	// draw the data
	for(var CircleArr in crg){
		CircleArr = crg[CircleArr];
		for(var circle in CircleArr){
			current = CircleArr[circle];
			drawCircle(ctx,current.color,current.x,current.y,current.s,0,"#FFF");
		}
	}
};

function drawCircle(ctx, fillColor, x, y, radius, strokeWidth, strokeColor){
	//fillColor = hslToRgb(Math.random(),1,.5)
	ctx.fillStyle = "rgb("+fillColor.r.toFixed(0)+","+fillColor.g.toFixed(0)+","+fillColor.b.toFixed(0)+")";
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
	render();

	then = now;
};

reset();
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

// onresize
$(window).resize(function() {
	w = window.innerWidth;
	h = window.innerHeight;
	canvas.height = h;
	canvas.width = w;
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
