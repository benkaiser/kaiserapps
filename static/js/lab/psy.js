var canvas=$("#canvas").get(0);
var ctx=canvas.getContext('2d');

var hiddenCanvas=$("#hiddenCanvas").get(0);
var hctx = hiddenCanvas.getContext('2d');
w = window.innerWidth;
h = window.innerHeight;

canvas.width = w;
canvas.height = h;

var mousex = 0;
var mousey = 0;
var wl,hl;
var xu,xd,yu,yd;


// setup FizzyText
var FizzyText = function() {
  this.color = "#FFFFFF";
  this.backgroundColor = "#FFFFFF";
  this.allowOutside = true;
  this.toggleEyeDrop = function() {
    if(toggle){
      $("canvas").css("cursor","crosshair");
    } else {
      $("canvas").css("cursor","inherit");
    }
    toggle = !toggle;
  }
  this.reset = function (){
    reset();
  };
  this.save = function (){
    sendToServer();
  };
  this.calcsize = function() {
    calcSize(true);
    render();
  }
  this.stopChance = .1;
  this.numberOfLines = 5;
  this.repeatInterval = 100;
};
// editable by user
var text = new FizzyText();

var squares = new Array();
var squareSize = 30;
var tmpCol;
var intervalTmp;
var toggle = true;

function press(e){
  var unicode=e.keyCode? e.keyCode : e.charCode
  if(unicode == 65){
    text.allowOutside = !text.allowOutside;
  } else if(unicode == 84){
    text.toggleEyeDrop();
  } else if(unicode == 67){
    calcSize(true);
    render();
  } else if(unicode == 82){
    reset();
  } else if(unicode == 83){
    sendToServer();
  } else {
    console.log("Other character pressed:" + unicode);
  }
}

var reset = function () {

  squares = new Array();

  var firstColHue = Math.random();
  tmpCol = rgbToHex(hslToRgb(firstColHue,1,.5));
  text.backgroundColor = rgbToHex(hslToRgb((firstColHue+.5)%1,1,.5));
  text.color = tmpCol;
  for(var x = 0; x < text.numberOfLines; x++){
    goCreate();
  }

  clean();

  calcSize(true);
  render();
}

function getExist(x,y){
  for(var square in squares){
    if(squares[square].x == x && squares[square].y == y)
      return square;
  }
  return false;
}

function clean(){
  for(var square in squares){
    for(var square2 in squares){
      if(square == square2){
        continue;
      }
      if(squares[square].x == squares[square2].x && squares[square].y == squares[square2].y){
        squares.splice(square,1);
        break;
      }
    }
  }
}

function goCreate(){
  var y = 0;
  var x = 0;
  while(true){
    // chance of stopping
    if(Math.random() < text.stopChance){
      break;
    }

    var tmpSquare = {
      "x": x,
      "y": y,
      "color": tmpCol
    }

    squares.push(tmpSquare);
    var test = Math.random();
    if(test < .25){
      x++;
    } else if(test < .5){
      x--;
    } else if(test < .75){
      y++;
    } else {
      y--;
    }
  }
}


function calcSize(save){
  // get/re-get base sizes
  w = window.innerWidth;
  h = window.innerHeight;

  canvas.width = w;
  canvas.height = h;

  xu = 0;
  xd = 0;
  yu = 0;
  yd = 0;
  for(var square in squares){
    square = squares[square];
    if(square.x > xu){ xu = square.x; }
    if(square.x < xd){ xd = square.x; }
    if(square.y > yu){ yu = square.y; }
    if(square.y < yd){ yd = square.y; }
  }
  //console.log(xu + "-" + xd + "-" + yu + "-" + yd);
  wl = xu-xd+1;
  hl = yu-yd+1;

  var tmpwl = (((w/2)-50) / wl);
  var tmphl = (((h-2)-50) / 2 / hl);


  if(tmpwl < tmphl){
    squareSize = tmpwl;
  } else {
    squareSize = tmphl;
  }

  squareSize = squareSize.toFixed(0);
  squareSize = parseInt(squareSize);
}

function paint(){

  var didPaint = false;
  for(var square in squares){
    var index = square;
    square = squares[square];

    var xmin = square.x*squareSize + parseInt(w/2);
    var ymin = square.y*squareSize + parseInt(h/2);

    if(mousex > xmin && mousex < xmin+squareSize && mousey > ymin && mousey < ymin+squareSize){
      if(mousex < xmin+squareSize){
        if(toggle){
          if(text.color != text.backgroundColor){
            square.color = text.color;
          } else {
            squares.splice(index,1);
          }
        } else {
          text.color = square.color;
        }
        didPaint = true;
      }
    }
  }
  if(!didPaint){
    if(toggle && text.allowOutside && text.color != text.backgroundColor){
      var x = Math.round((mousex - parseInt(w/2) - squareSize/2) / squareSize,0);
      var y = Math.round((mousey - parseInt(h/2) - squareSize/2) / squareSize,0);

      var tmpSquare = {
        "x": x,
        "y": y,
        "color": text.color
      }
      squares.push(tmpSquare);
    } else if(!toggle) {
      text.color = text.backgroundColor;
    }
  }
  render();
}

var render = function () {
  ctx.fillStyle = text.backgroundColor;
  ctx.fillRect(0,0,10000,10000);

  for(var square in squares){
    square = squares[square];
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x*squareSize + parseInt(w/2),square.y*squareSize + parseInt(h/2),squareSize,squareSize);
  }

};

$(window).resize(function() {
  calcSize(true);
  render();
});

reset();

// UNCOMMENT FOR SEIZURES
//setInterval(reset,10000);


function sendToServer(){
  // First let the UI know it is saving
  $("#response").html("Saving...");
  $("#response").css("display","block");

  calcSize(true);
  render();

  // put the image on a new canvas
  var tmpw = (wl+1)*squareSize;
  var tmph = (hl+1)*squareSize;
  hiddenCanvas.width = tmpw;
  hiddenCanvas.height = tmph;

  hctx.putImageData(ctx.getImageData(xd*squareSize + parseInt(w/2) - squareSize/2, yd*squareSize + parseInt(h/2) - squareSize/2, tmpw, tmph),0,0);

  // send the new canvas data to the server
  var canvasData = hiddenCanvas.toDataURL("image/png");

  var ajax = new XMLHttpRequest();

  ajax.onreadystatechange=function(){
    if (ajax.readyState==4 && ajax.status==200){
      var num = ajax.responseText;
      $("#response").html("File Saved! Link: <a href='http://www.kaiserapps.com/fun/psy/view.php?id="+num+"'>kaiserapps.com/fun/psy/view.php?id="+num+"</a>");
    }
  }

  ajax.open("POST", 'testSave.php?c=' + escape(text.backgroundColor), true);
  ajax.setRequestHeader('Content-Type', 'application/upload');
  ajax.send(canvasData );
}

/* DAT.GUI stuff */

window.onload = function() {

  var gui = new dat.GUI();

  gui.addColor(text, 'color').listen();
  var controller2 = gui.addColor(text, 'backgroundColor').listen();
  gui.add(text,'toggleEyeDrop');
  gui.add(text,'allowOutside').listen();
  gui.add(text,'calcsize');
  gui.add(text,'reset');
  gui.add(text, 'save');

  var f1 = gui.addFolder("Render Options (advanced)");
  f1.add(text, 'stopChance',.001,1);
  f1.add(text, 'numberOfLines',1,100);

  var controller = f1.add(text, 'repeatInterval',1,10000);

  controller.onFinishChange(function(value) {
    clearInterval(intervalTmp);
    if(value != 100){
      intervalTmp = setInterval(reset, value);
    }
  });
  controller2.onChange(function(value) {
    render();
  });
};

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
    return {r: parseInt(r * 255),g: parseInt(g * 255),b: parseInt(b * 255)};
}

function rgbToHex(x) {
    return "#" + ((1 << 24) + (x.r << 16) + (x.g << 8) + x.b).toString(16).slice(1);
}

var painting = false;
// GET THE MOSE CO-ORDS ON MOVE
document.onmousemove=getMouseCoordinates;
$(document).keyup(press);
// onclick paint
canvas.onmousedown=paintOn;
canvas.onmouseup=paintOff;

function getMouseCoordinates(event){
  ev = event || window.event;
  mousex = ev.pageX;
  mousey = ev.pageY;
  if(painting){
    paint();
  }
}
function paintOn(){
  painting = true;
  paint();
}
function paintOff(){
  painting = false;
}
