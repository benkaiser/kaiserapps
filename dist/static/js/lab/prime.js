var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');

w = window.innerWidth;
h = window.innerHeight;

canvas.width = w;
canvas.height = h;

var mousex = -10000;
var mousey = -10000;

cntr = 0;

var xoff = Math.random()*100-50;
var yoff = Math.random()*100-50;
var size = Math.random()*40+80;
var on = Math.random();


currentColor = Math.random();

var CircleArr = new Array();

var reset = function () {
	CircleArr = new Array();
	CircleArr[0] = {
		x: w / 2,
		y: 0,
		s: h/50,
		color: hslToRgb(currentColor,1,.5),
		text: getPrime()
	};
}

var update = function (modifier) {
	// MOVEMENT CODE
	var movConst = 100;

	if(cntr++ % 10 == 0){
		createCircle();
	}
	// chance of changing the "prime nightmare" text location
	if(cntr % 10 == 0){
		xoff = Math.random()*w/2-w/4;
		yoff = Math.random()*h/2-h/4;
		size = Math.random()*300+20;
		on = Math.random();
	}

	for(var circle in CircleArr){
		circle = CircleArr[circle];
		circle.x += Math.random()*10-5;
		circle.y -= Math.random()*10;
	}

	while(CircleArr.length > 2 && (CircleArr[0].x + CircleArr[0].s > w || CircleArr[0].x + CircleArr[0].s < 0 || CircleArr[0].y + CircleArr[0].s > h || CircleArr[0].y + CircleArr[0].s < 0) ){
		CircleArr.shift();

	}
};

function createCircle(){
	currentColor += Math.random();

	tmp = CircleArr[CircleArr.length-1];

	CircleArr[CircleArr.length] = {
		x: mousex,
		y: mousey,
		s: Math.random()*h/10,
		color: hslToRgb(currentColor % 1.00,1,.5),
		text: getPrime()
	};
}

var render = function () {
	// wipe the canvas
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,10000,100000);

	ctx.textAlign = "center";
	// draw the data
	for(var circle in CircleArr){
		current = CircleArr[circle];
		drawHeart(ctx,current.color,current.x,current.y,current.s,3,"#000",current.text);
	}


	if(on > .7){
		drawHeart(ctx, "#000", w/2+xoff, h/2+size/2+yoff,size ,3, "#000","Prime Nightmare");
	}
};

function drawHeart(ctx, fillColor, x, y, radius, strokeWidth, strokeColor,text){
	//ctx.fillStyle = colorToHex("rgb("+fillColor[0].toFixed(0)+","+fillColor[1].toFixed(0)+","+fillColor[2].toFixed(0)+")");
	ctx.fillStyle = "#FFF";
	ctx.font = radius + "px Ariel";
	ctx.strokeStyle = strokeColor; // red
	ctx.lineWidth   = strokeWidth;
	ctx.strokeText(text, x,y);
	ctx.fillText(text,x,y);
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
setInterval(main, 1);

var pcnt = 2;

function getPrime(){
	while(true){
		if(testPrime(pcnt) == true){
			var old = pcnt;
			pcnt = Math.floor(Math.random()*100000);
			return old;
		}
		pcnt++;
	}
}
function testPrime(num){
	for(var y = 2; y <= Math.ceil(num/2);y++){
		if(num % y == 0){
			return false;
		}
	}
	return true;
}

// onresize
$(window).resize(function() {
	w = document.body.clientWidth;
	h = window.innerHeight;
	canvas.height = h;
	canvas.width = w;
});

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

document.onmousemove=getMouseCoordinates;
document.onclick=reset;
function getMouseCoordinates(event){
	ev = event || window.event;
	mousex = ev.pageX;
	mousey = ev.pageY;
	//createCircle();
}
