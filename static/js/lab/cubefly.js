// set up stats
var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
stats.domElement.style.zIndex = '5';

document.body.appendChild( stats.domElement );

// Ben's variables
var w = window.innerWidth,
  h = window.innerHeight;

var mousex = 0,
  mousey = 0;

var Sarr = new Array();

var createCnt = 0;
var cnt = 0;
var pnt = -350;
var multiple = 2000;
var minus = multiple/2;
var keysDown = new Array();
var KEYUP = 38, KEYDOWN = 40, KEYLEFT = 37, KEYRIGHT = 39;
var paused = false;
var speed = 20;
var size = 50;
var dead = false;
var time = 0.00;
var sceneAdded = 0;
var OUT_CONSTANT = 200000;
var NUM_CUBES = 600;

// set the scene size
var WIDTH = w,
    HEIGHT = h;

// set some camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 100000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#container');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                                ASPECT,
                                NEAR,
                                FAR  );
var scene = new THREE.Scene();

      scene.add(camera);
scene.fog = new THREE.Fog(0xffffff, 2500, 3000);

// start the renderer
renderer.setSize(WIDTH, HEIGHT);
// set background color
renderer.setClearColor(new THREE.Color(0xffffff), 1);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

reset();

//Add center cube
var base = new THREE.MeshLambertMaterial({ color: 0x000000, opacity: .5, transparent: true });
var size = 50;
var cube = new THREE.Mesh( new THREE.BoxGeometry( size, size, size ), base );
scene.add( cube );

// add lighting
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 0, -100, 0 );
scene.add( directionalLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 0, 0, -100 );
scene.add( directionalLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( -100, 0, 0 );
scene.add( directionalLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 100, 100, 100 );
scene.add( directionalLight );

// draw!
renderer.render(scene, camera);

$("#subtitle").html("QUICK! Use the mouse to drive!");
setTimeout(ready, 3000);
function ready(){$("#subtitle").html("");}

function reset(){
  update();
  dead = false;
  speed = 30;
  time = 0.0;
  camera.position.z = -800;
  camera.position.y = 200;
  camera.position.x = 0;
  $("#heading").html("");
  $("#subtitle").html("");
}

function createAllSpheres(){
  for(var x = 0; x < NUM_CUBES; x++){
    var Nbase = new THREE.MeshLambertMaterial({ color: 0x000000 });
    var sphere = new THREE.Mesh( new THREE.BoxGeometry( size, size, size ), Nbase );

    //sphere.position = {x: Math.random()*multiple-minus, y: Math.random()*multiple-minus, z: -2000 };
    sphere.position.z = OUT_CONSTANT;

    // add the sphere to the scene
    scene.add(sphere);

    Sarr.push(sphere);
  }
}
createAllSpheres();


function addSphere(howMany) {

  if(sceneAdded == NUM_CUBES){
    sceneAdded = 0;
  }

  for(var x = 0; x < howMany; x++){
    Sarr[sceneAdded+x].position.set(Math.random()*multiple-minus, Math.random()*multiple-minus, 3000);
    Sarr[sceneAdded+x].material.color.setHSL(Math.random(),1,0.5);
  }

  sceneAdded += howMany;
}

function removeSphere(i) {

  Sarr[i].position.z = OUT_CONSTANT;

  x = Sarr[i];
  Sarr.splice(i,1)
  Sarr.push(x);

}


function checkCollision(){
  for(s in Sarr){
    var index = s;
    s = Sarr[s];
    if(s.position.z == OUT_CONSTANT){
      continue;
    }

    if(s.position.x > -size && s.position.x < size && s.position.y > -size && s.position.y < size && s.position.z > -size && s.position.z < size){
      dead = true;
      $("#heading").html("Game Over");
      $("#subtitle").html("You survived: " + time.toFixed(2) + " seconds<br/>click to retry");
    }
  }
}

function update(mod) {

  if(typeof mod == "number"){
    createCnt += parseFloat(mod)*100;
  }

  if(createCnt > speed){
    addSphere(10);
    createCnt = 0;
  }

  cnt++;
  if(cnt % 300 == 0){
    if(speed > 4){
      speed--;
    }
    cnt = 0;
  }

  var x = 0;
  var y = 0;
  var accel = 3*mod;

  // calculate move from mouse
  x = (mousex/w*4-2);
  y = mousey/h*4-2;

  for(s in Sarr){
    var i = s;
    s = Sarr[s];

    if(s.position.z == OUT_CONSTANT){
      continue;
    }

    s.position.z -= 500*accel;
    s.position.x += 50*x*accel;
    s.position.y += 50*y*accel;

    s.lookAt(cube.position);

    var movMod = accel*10;
    if(s.position.y < 0){
      s.position.y+=movMod;
    } else {
      s.position.y-=movMod;
    }
    if(s.position.x < 0){
      s.position.x+=movMod;
    } else {
      s.position.x-=movMod;
    }

    if(s.position.z > 800 && s.position.z > OUT_CONSTANT){
      removeSphere(i);
    }
  }

  time.toFixed(2);

  $("#time").html(time.toFixed(2));
  checkCollision();
}

function render(mod){

  if(!paused && !dead){
    update(mod);
  }

  if(!dead){
    camera.position.x = (mousex/w*400-200);
    camera.position.y = mousey/h*400-200;
  } else {
    var scale = ((parseFloat(cnt++)/500.0)%(Math.PI*2))-Math.PI*2;
    camera.position.y = 200;
    camera.position.x = Math.sin(scale)*800;
    camera.position.z = Math.cos(scale)*800;
  }
  /*camera.rotation.y = mousex/w*.5-.25;
  camera.rotation.x = -(mousey/h*.5-.25);
  */

  camera.lookAt(cube.position);

  renderer.render(scene, camera);
}

document.onmousemove=getMouseCoordinates;
document.onclick=click;
function getMouseCoordinates(event){
  ev = event || window.event;
  mousex = ev.pageX;
  mousey = ev.pageY;
}
function click(event){
  if(!dead){
    paused = !paused;
  } else {
    for(g in Sarr){
        removeSphere(g);
    }
    reset();
  }
}

// main event call loop
var main = function () {
  // notify stat start
  stats.begin();

  var now = Date.now();
  var delta = now - then;

  if(!dead && !paused){
    time += delta/1000;
  }
  render(delta / 1000);

  then = now;

  // notify stat end
  stats.end();
};

var then = Date.now();

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

// instead of setInterval(main, 16)
(function animloop(){
  requestAnimFrame(animloop);
  main();
})();

/* Log mouse keys */
// Handle key events
addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

$(window).delegate('*', 'keydown', function (evt){return false;});


addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

$(window).resize(function() {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect	= window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

$('#pp').click(function() {
  audio = document.getElementById("audioElem");
  if (audio.paused == false) {
    audio.pause();
    $("#pp").html("Play Music");
  } else {
    audio.play();
    $("#pp").html("Pause Music");
  }
  if(!dead){
    paused = !paused;
  }
});


// UTIL FUNCTION

// get x/y of cube
function toScreenXY( position, camera, jqdiv ) {
    var pos = position.clone();
    projScreenMat = new THREE.Matrix4();
    projScreenMat.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
    projScreenMat.multiplyVector3( pos );

    return { x: ( pos.x + 1 ) * jqdiv.width() / 2 + jqdiv.offset().left,
         y: ( - pos.y + 1) * jqdiv.height() / 2 + jqdiv.offset().top };
}
