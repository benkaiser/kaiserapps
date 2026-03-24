var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;
/*function drawPoint(x,y,w,h,color){
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h);
}

function pausecomp(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
}

var radius = 200;
var width = 1;
var height = 1;
var color = '#00e3ff'

for(var x = 0.00; x < radius*2; x += radius*.00001){
	drawPoint(x,radius-Math.sqrt(Math.pow(radius,2)-Math.pow(x-radius,2)),width,height,color);
}
for(var x = 0.00; x < radius*2; x += .01){
	drawPoint(x,radius+Math.sqrt(Math.pow(radius,2)-Math.pow(x-radius,2)),width,height,color);
}*/

/*var img = new Image();
var w = 166;
var h = 109;

img.onload = function(){
  for (var i=0;i<100;i++){
    for (var j=0;j<100;j++){
      ctx.drawImage(img,j*w,i*h,w,h);
    }
  }
};
img.src = 'images/back.jpg';*/


var bgReady = false;
var bgImage = new Image();
var bgW = 800;
var bgH = 800;
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "/static/img/lab/mojo/back.jpg";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "/static/img/lab/mojo/hero.png";


var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "/static/img/lab/mojo/monster.png";

var bananaReady = false;
var bananaImage = new Image();
bananaImage.onload = function () {
	bananaReady = true;
};
bananaImage.src = "/static/img/lab/mojo/banana.png";

// Game objects
var hero = {
	speed: 4,
	x: 0,
	y: 0,
	w: 32,
	h: 45,
	i: 0,
	j: 0
};
var monster = {
	speed: 4,
	x: 0,
	y: 0,
	w: 32,
	h: 32,
	i: 0,
	j: 0
};
var banana = {
	x: 0,
	y: 0,
	w: 64,
	h: 64
};
var bananasCaught = 0;
var monstersCaught = 0;

// Handle key events
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

$(window).delegate('*', 'keydown', function (evt){return false;});


addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = monster.w + (Math.random() * (canvas.width - monster.w*2));
	monster.y = monster.h + (Math.random() * (canvas.height - monster.w*2));
};
function calcSpeed(object, up, down, left, right,modifier){
	if(up in keysDown){
		object.j -= object.speed;
	}
	if(down in keysDown){
		object.j += object.speed;
	}
	if(left in keysDown){
		object.i -= object.speed;
	}
	if(right in keysDown){
		object.i += object.speed;
	}

	object.i *= 1-(1 * modifier);
	object.j *= 1-(1 * modifier);
	object.x += object.i * modifier;
	object.y += object.j * modifier;
}
var update = function (modifier) {
	calcSpeed(hero,38,40,37,39,modifier);
	calcSpeed(monster,87,83,65,68,modifier);


	// Are they touching?
	if (collision(hero,monster)) {
		++monstersCaught;
		reset();
	}
	checkOver(hero);
	checkOver(monster);
};

function checkOver(obj){
	// checks if object has jumbped the border
	if(obj.x + obj.w > canvas.width){
		obj.x = 0;
	}
	if(obj.x < 0) {
		obj.x =  canvas.width - obj.w;
	}
	if(obj.y + obj.h > canvas.height){
		obj.y = 0;
	}
	if(obj.y < 0) {
		obj.y =  canvas.height - obj.h;
	}
}
function putBananaPos(){
	while(collision(banana,hero)){
		banana.x = banana.w + (Math.random() * (canvas.width - banana.w*2));
		banana.y = banana.h + (Math.random() * (canvas.height - banana.w*2));
	}
}
function collision(obj1,obj2){
	if (
		obj1.x <= (obj2.x + obj2.w)
		&& obj2.x <= (obj1.x + obj1.w)
		&& obj1.y <= (obj2.y + obj2.h)
		&& obj2.y <= (obj1.y + obj1.h)
	) {
		return true;
	}
	return false;
}

var render = function () {
	if (bgReady) {
		for (var i=0;i<10;i++){
		    for (var j=0;j<10;j++){
		      ctx.drawImage(bgImage,j*bgW,i*bgH,bgW,bgH);
		    }
		  }
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
	 	ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	/*if (bananaReady) {
	 	ctx.drawImage(bananaImage, banana.x, banana.y);
	}*/

	var rotation = .83;
 	ctx.rotate(rotation);
	// Score
	ctx.fillStyle = "rgb(10, 10, 10)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Captured by mine " + monstersCaught + " times", 43, 10);
	ctx.rotate(-rotation);
};

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

function keypressCheck(e) {
    var e = window.event||e; // Handle browser compatibility
    var keyID = e.keyCode;
    //space pressed

        e.preventDefault(); // Prevent the default action\

}
