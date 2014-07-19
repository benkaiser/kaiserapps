LoopVisualizer = (function() {
  var freqByteData;
  var timeByteData;
  var group = 64;
  var colors = new Array();

  function init() {

    ////////INIT audio in
    freqByteData = new Uint8Array(analyser.frequencyBinCount);
    timeByteData = new Uint8Array(analyser.frequencyBinCount);

    cnt = 0;

    // NOTE: 8 is assumed width of elements
    for(var x = 0; x < 512/group; x++){
      colors[x] = 0;
    }

  }

  function remove() {


  }

  function update() {

    analyser.smoothingTimeConstant = 0.1;
    analyser.getByteFrequencyData(freqByteData);
    analyser.getByteTimeDomainData(timeByteData);

    var length = freqByteData.length/2;

    var datArr = new Array();

    for(var x = 0; x < length / group; x++){
      datArr.push(0);
    }
    for(var x = 0; x < length; x++){
      datArr[Math.floor(x / group)] += freqByteData[x]/128;
    }

    if(cnt++ % 30 == 0){
      for(var x = 0; x < 512/group; x++){
        colors[x] = rgbToHex(hslToRgb(Math.random(),1,.5));
      }
    }

    size = 0;
    for(var x = 0; x < datArr.length; x++){
      spacing = window.innerWidth / datArr.length;
      ctx.fillStyle = colors[x];
      var s = datArr[x] * .5;
      var height = s*window.innerHeight/group;
      ctx.fillRect(spacing * x + spacing / 2 - (s/group*spacing)/2, window.innerHeight-height, s/group*spacing, height);

      size += datArr[x];
    }

    size /= datArr.length;

  }

  return {
    init:init,
    update:update,
    remove:remove
  };
  }());

// UTILITY FUNCTIONS
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



/**
*
* Loop Waveform Visualizer by Felix Turner
* www.airtight.cc
*
* Audio Reactive Waveform via Web Audio API.
*
*/

var mousex = 0, mousey = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, camera, scene, renderer, material, container;
var source;
var analyser;
var buffer;
var audioBuffer;
var dropArea;
var audioContext;
var source;
var processor;
var analyser;
var xhr;
var started = false;

// Bens Vars
var canvas, ctx;
var droppedFiles;
var circles = new Array();
var size = 10;
var cnt;

$(document).ready(function() {

  //Chrome is only browser to currently support Web Audio API
  var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  var is_webgl = ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )();

  if(!is_chrome){
    $('#loading').html("This demo requires <a href='https://www.google.com/chrome'>Google Chrome</a>.");
  } else if(!is_webgl){
    $('#loading').html('Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br />' +
    'Find out how to get it <a href="http://get.webgl.org/">here</a>, or try restarting your browser.');
  }else {
    $('#loading').html('drop mp3 here');
    init();
  }

});

function init() {

  canvas=$("#canvas").get(0);
  ctx=canvas.getContext('2d');

  // stop the user getting a text cursor
  document.onselectStart = function() {
    return false;
  };

  //add stats
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  //init listeners
  $("#loadSample").click( loadSampleAudio);
  $(document).mousemove(onDocumentMouseMove);
  $(window).resize(onWindowResize);
  document.addEventListener('drop', onDocumentDrop, false);
  document.addEventListener('dragover', onDocumentDragOver, false);

  onWindowResize(null);
  audioContext = new window.webkitAudioContext();

}

function loadSampleAudio() {
  $('#loading').text("loading...");

  source = audioContext.createBufferSource();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 1024;

  // Connect audio processing graph
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  loadAudioBuffer("audio/beytah.mp3");
}

function loadAudioBuffer(url) {
  // Load asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  request.onload = function() {
    audioBuffer = audioContext.createBuffer(request.response, false );
    finishLoad();
  };

  request.send();
}

function finishLoad() {
  source.buffer = audioBuffer;
  source.looping = true;
  source.noteOn(0.0);
  startViz();
}

function onDocumentMouseMove(event){
        ev = event || window.event;
        mousex = ev.pageX;
        mousey = ev.pageY;
}

function onWindowResize(event) {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {

  stats.begin();

  // wipe the canvas
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0,0,10000,100000);

  if(cnt % 1 == 0){
    updateCircles();
  }

  LoopVisualizer.update();
  drawCircles();



  stats.end();
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

function drawCircles(){
  for(c in circles){
            c = circles[c];
            drawCircle(ctx, c.color, c.x, c.y, c.s, 0, 0);
    }
}

function updateCircles(){

  if(cnt % 5 == 0){
    // add new circle
      var tmp = {
              x: mousex,
              y: mousey,
              mx: Math.random()*20-10,
              my: Math.random()*20-10,
              s: size*.5,
              color: rgbToHex(hslToRgb(Math.random(),1,.5))
      };
      // color: rgbToHex(hslToRgb(cnt/100.0%1,1,.5))
      circles.push(tmp);
    }

    // move circles
    for(c in circles){
    		var index = c;
            c = circles[c];

            c.x += c.mx * Math.random();
            c.y += c.my * Math.random();
            c.s -= 4 * Math.random();

            if(c.s < 3){
              circles.splice(index,1);
            }
    }
}

function onDocumentDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  return false;
}

function onDocumentDrop(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  //clean up previous mp3
  if (source) source.disconnect();
  LoopVisualizer.remove();

  $('#loading').show();
  $('#loading').text("loading...");

  droppedFiles = evt.dataTransfer.files;

  var name = droppedFiles[0].name;

  $("#name").html(name.substr(0, name.lastIndexOf(".")));

  var reader = new FileReader();

  reader.onload = function(fileEvent) {
    var data = fileEvent.target.result;
    initAudio(data);
  };

  reader.readAsArrayBuffer(droppedFiles[0]);

}

function initAudio(data) {
  source = audioContext.createBufferSource();

  if(audioContext.decodeAudioData) {
    audioContext.decodeAudioData(data, function(buffer) {
      source.buffer = buffer;
      createAudio();
    }, function(e) {
      console.log(e);
      $('#loading').text("cannot decode mp3");
    });
  } else {
    source.buffer = audioContext.createBuffer(data, false );
    createAudio();
  }
}


function createAudio() {
  processor = audioContext.createScriptProcessor(2048 , 1 , 1 );
  //processor.onaudioprocess = processAudio;

  analyser = audioContext.createAnalyser();

  source.connect(audioContext.destination);
  source.connect(analyser);

  analyser.connect(processor);
  processor.connect(audioContext.destination);

  source.start(0);

  startViz();
}

function startViz(){

  $('#loading').hide();

  LoopVisualizer.init();

  if (!started){
    started = true;
    animate();
  }

}
