var back = new Backfun("center","#4bf",false,"black", 5, 20);
back.addMouse(["#EF2B6F","#29E8AE","#6C28FF","#FF2855","#21E6ED"], 0);
back.addPoint($(document).width()/2-15, 85, ["#EF2B6F","#29E8AE","#6C28FF","#FF2855","#21E6ED"], 0.8);
back.start();

var objects = new Array();

function addItem(name, description, img, shortHand,displayTry){
  var tryV = "";
  if(displayTry){
    tryV = '<a href="#'+shortHand+'" class="changebutton" onclick="change('+objects.length+')">try</a> or ';
  }
  img = "/static/img/lab/" + img;

  var tmpItem = $('<a name="'+shortHand+'" class="app" target="_blank" href="lab/'+shortHand+'"><h2>'+name+'</h2></a><p class="options">'+tryV+'<a target="_blank" href="lab/'+shortHand+'">open in new window</a></p><a class="app" target="_blank" href="lab/'+shortHand+'"><div class="switch"><img class="experimentImg" src="'+img+'" alt="'+name+' example" /></div><p class="caption">'+description+'</p></a>');
  $("#whitecenter").append(tmpItem);
  var tmpArray = {
    item: tmpItem,
    name: name,
    description: description,
    img: img,
    shortHand: shortHand
  };
  objects.push(tmpArray);
}

function change(x) {
  // make all of them images
  for(o in objects){
    $(objects[o].item).children(".switch").html('<img class="experimentImg" src="'+objects[o].img+'" alt="'+objects[o].name+' example" />');
  }
  // now set the primary one to an iframe
  console.log([objects[x], x]);
  $(objects[x].item).children(".switch").html("<iframe class='appFrame' src='lab/"+objects[x].shortHand+"'></iframe>");
}


// add all the experiments
addItem("Cube Fly", "Cube Fly is an immersive 3d game where you are the grey cube and you must dodge the ever-faster approaching colored cubes.", "cubefly.png", "cubefly",1);
addItem("Vis", "Music visualiser in javascript using chromes audio API.", "vis.png", "vis",1);
addItem("Psy!", "Psy is an interactive painting application that lets you create a drawing made out of large squares. It starts you off with a shape for you to work around. Use the panel in the top right to create your drawing, then save your shape and share it with your friends.", "psy.png", "psy",1);
addItem("Wobble", "Wobble was just a fun little idea I had (I was getting used to the quadriaticCurveTo() function)", "wobble.png", "wobble",1);
addItem("Spider Wobble", "Changing spawn point version over wobble (creates lines autonomously).", "spiderwobble.png", "swobble",1);
addItem("Nexus", "Awesome animation that I was inspired by (it is a standard android live wallpaper). So I decided to write my own implementation in canvas with a little kaiserapps touch.", "nexus.png", "nexus",1);
addItem("Firework Birthday Card Creator", "Originally a custom birthday card created for my friend, I spent a few minutes making it dynamic so anyone can make any card and send it to anyone! Makes giving birthday cards nice and simple for myself.", "birthday.png", "birthday",1);
addItem("Fader", "Just a simple screen saver idea I got when watching the animations behind the lyrics on the screen at church. Co-developed with the help of Eden Vicary.", "fader.png", "fader",1);
addItem("Tunnel Fader", "Fader mod to look like a tunnel.", "tunnelfader.png", "tunnelfader",1);
addItem("Tunnel", "Just a tripping tunnel idea I got when talking to my brother Josh.", "tunnel.png", "tunnel",1);
addItem("Snafu!", "My attempt at recreating an awesome arcade game.", "snafu.png", "snafu",1);
addItem("Underwater Bubbles", "lab/underwaterbubbles", "Simply a fun application that simulates bubbles floating up in water. Move the cursor to move the spawn point of the bubbles.", "underwaterbubbles.png", "ub",1);
addItem("Dual Bubble Cannons", "lab/dualbubblecannons", "Just a nice screen saver, no interactivity (sorry).", "dbc.png", "dbc",1);
addItem("Hearts", "lab/hearts", "A remix of the underwater bubbles creation (using text hearts instead of circles).", "hearts.png", "hearts",1);
addItem("Prime Nightmare", "lab/primes", "I remixed the hearts example to show prime numbers in sequence coming from the cursor. I made it for my brother Josh.", "primenightmare.png", "prime",1);
addItem("XTT", "Custom message making. Using canvas text drawing and css3 @font-face. (its called XTT because josh picked that random name, we think it now stands for eXtensive Text Transposer, which means absolutely nothing and was really just a mix up of the characters in txt).", "xtt.png", "xtt",1);
addItem("Mojo vs. Mine", "First game I created on canvas that got me interested.", "mojo.png", "mojo",0);
addItem("Ball in Box", "Experimenting with a moving spawn point.", "bib.png", "bib",1);


$(window).delegate('*', 'keydown', function (evt){if(evt.keyCode == 38 || evt.keyCode == 40){return false;}});
