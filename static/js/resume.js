// resume script
var content = new Array();
var latest = 0;

$(document).ready(function(){
  addGroup("Home",'<div class="jumbotron clearfix">\
      <img class="pull-right" id="mug_shot" src="/static/img/resume/mug_shot_small.jpg" alt="mug_shot"/>\
      <h1>Benjamin Kaiser</h1>\
      <p>Welcome to the Resume of Benjamin Kaiser.</p>\
      <p><div class="btn btn-primary btn-large" onclick="changeNext()">Next <i class="icon-white icon-arrow-right"></i></div></p>\
    </div>');
  addGroup("Education",'\
      <div class="page-header">\
        <h1>Education</h1>\
      </div>\
      <div class="row"><div class="col-sm-6">\
      <h2>RMIT</h2>\
      <h4>Info</h4>\
      <p>University Full Name: Royal Melbourne Institute of Technology</p>\
      <p>Degree Name: Bachelor of Technology (Computing Studies)</p>\
      <p>Status: Graduated</p>\
      <h4>Units</h4><table class="table table-striped"><tr><th>Code</th><th>Unit Name</th><th>Grade</th></tr>\
      '+getUnit("CPT110","2010","Introduction to Information Technology","HD","")+'\
      '+getUnit("CPT120","2011","Introduction to Programming","HD","")+'\
      '+getUnit("CPT121","2011","Programming 1","HD","")+'\
      '+getUnit("CPT223","2011","Scripting Language Programming","D","")+'\
      '+getUnit("CPT140","2011","Database Concepts","HD","")+'\
      '+getUnit("CPT270","2011","Web Programming","HD","")+'\
      '+getUnit("CPT230","2011","Software Engineering Fundamentals","D","")+'\
      '+getUnit("CPT221","2011","Programming 2 (Java)","HD","")+'\
      '+getUnit("CPT310","2012","Professional Computing Practice","HD","")+'\
      '+getUnit("CPT323","2011","Object-Orientated Programming in C++","HD","")+'\
      '+getUnit("CPT373","2012","Web Development Technologies","HD","")+'\
      '+getUnit("CPT374","2012","Document Markup Languages","D","")+'\
      </table></div><div class="col-sm-6">\
      <h2>Swinburne</h2>\
      <h4>Info</h4>\
      <p>University Full Name: Swinburne University of Technology</p>\
      <p>Degree Name: Bachelor of Business (Information Systems)</p>\
      <p>Status: finished, awaiting graduation</p>\
      <h4>Units</h4><table class="table table-striped"><tr><th>Code</th><th>Unit Name</th><th>Grade</th></tr>\
      '+getUnit("ACF110","2011","Accounting Fundamentals","C","")+'\
      '+getUnit("CIS13","2011","Information Systems Fundamentals","C","")+'\
      '+getUnit("IBA111","2012","Management Concepts (Introduction to Management)","C","")+'\
      '+getUnit("MAR110","2012","Marketing Concepts","D","")+'\
      '+getUnit("CIS11","2012","Information Methods","C","")+'\
      '+getUnit("CIS211","2012","Database Concepts and Modelling","D","")+'\
      '+getUnit("CIS23","2012","Management Support Systems","C","")+'\
      '+getUnit("CIS290","2012","Business Analysis and Modelling","P","")+'\
      '+getUnit("BLW300","2012","Cyberlaw","P","")+'\
      '+getUnit("CIS310","2013","Professional Reading and Writing in Information Systems Strategy","C","")+'\
      '+getUnit("CIS360","2012","Information Systems Project Management","P","")+'\
      </table></div></div>\
      <div class="row"><div class="col-sm-12">\
      <h2>Other Universities</h2>\
      <h4>Units</h4><table class="table table-striped"><tr><th>Code</th><th>Unit Name</th><th>Grade</th><th>University</th></tr>\
      '+getUnit("SSK12","2010","Introduction to University Learning","D","Murdoch University")+'\
      '+getUnit("BMS11","2010","Business Mathematics and Statistics","HD","Monash University")+'\
      '+getUnit("ECO11","2012","Principles of Economics","C","University of South Australia")+'\
      '+getUnit("IBA111","2012","Management Concepts (Introduction to Management)","C","Griffith University")+'\
      '+getUnit("MAS120","2013","Applied Mathematics","P","Murdoch University")+'\
      '+getUnit("MAS130","2013","Calculus and Matrix Algebra","HD","Murdoch University")+'\
      </table></div></div>\
      '+getSwitchButtons(false)+'\
    ');

  addGroup("Work",'\
      <div class="page-header">\
        <h1>Work</h1>\
      </div>\
      <h2>Kaisercraft</h2>\
      <div class="row">\
      <div class="col-sm-6">\
      <h4>Company Description</h4>\
      <p>\
      Kaisercraft is a SME with just under 100 employees. They sell their craft and scrapbooking products both nationally and internationally through thousands of stores. \
      </p>\
      </div><div class="col-sm-6">\
      <h4>Job Details</h4>\
      <p><strong>Job-title:</strong> Web Developer</p>\
      <p><strong>Dates of Employment:</strong> August 2011 - Current</p>\
      </div></div>\
      <h4>Job Description</h4>\
      <p>To build and maintain a new website and wholesale ordering cart along with several other backend systems for internal reporting.</p>\
      <h4>Key Accomplishments</h4>\
      <ul>\
      <li>Built the public <a href="http://www.kaisercraft.com.au">website</a> from the ground up using PHP and MySQL.</li>\
      <li>Built the wholesale cart which is a layer on-top of the main website that allows Kaisercraft stockists (independent retailers) to purchase from Kaisercraft online.</li>\
      <li>Built a backend system for the sales team which has the following features:\
        <ul>\
          <li>download orders from online into the accounting system</li>\
          <li>manage customer details</li>\
          <li>place orders on a behalf of a customer</li>\
          <li>View reports of sales data</li>\
        </ul>\
      <li>Built a backend system for the warehouse manager to mark products when they go out of stock so that we can report this on the wholesale cart.</li>\
      </ul>\
      <h4>Key Statistics of Accomplishments</h4>\
      <ul>\
        <li>Over $7 Million in sales have been processed in the new wholesale cart</li>\
        <li>Over 600 customers use the wholesale cart</li>\
        <li>Databased almost 7000 product skews including categorising and adding images for all products.</li>\
      </ul>\
      <h4>Programming Languages and Libraries Used</h4>\
      <ul>\
        <li>HTML and CSS</li>\
        <li>Javascript (Used extensively to make responsive ordering pages)</li>\
        <li>PHP (for all server-side code)</li>\
        <li>MySQL</li>\
        <li>Minor amounts of Python and Perl (form scripting to resize images before publishing to web)</li>\
        <li>Jquery and Jquery-ui for javascript and minor animations</li>\
        <li><a href="http://twitter.github.com/bootstrap/">Bootstrap</a> for UI framework.</li>\
      </ul>\
      <h4>Technologies and Development Tools Used</h4>\
      <ul>\
        <li>Originally <a href="http://panic.com/coda/">Coda</a> and recently <a href="http://www.sublimetext.com/2">Sublime Text 2</a> for IDE</li>\
        <li><a href="https://bitbucket.org/">Bitbucket</a> for source code management</li>\
        <li>LAMP stack</li>\
      </ul>\
      <h4>Kaisercraft Referee\'s</h4>\
      <address>\
        <strong>Stephen Kaiser</strong><br>\
        <abbr title="Work">W:</abbr> (+61) 3 5240 2000<br/>\
        <abbr title="Mobile">M:</abbr> (+61) 411 083 310<br/>\
        Role: Sole Director (and my dad)\
      </address>\
      <address>\
        <strong>Mark Sears</strong><br>\
        <abbr title="Work">W:</abbr> (+61) 3 5240 2000<br/>\
        <abbr title="Mobile">M:</abbr> (+61) 4391 876 054<br/>\
        Role: General Manager\
      </address>\
      <h4>Other Referee</h4>\
      <address>\
        <strong>Deryck Williams</strong><br>\
        <abbr title="Work">W:</abbr> (+61) 3 5246 2909<br/>\
        Role: Java Web Developer<br/>\
        Company: Target Australia\
      </address>\
      <h4>Other Notes</h4>\
      <div class="alert">For the entirety of my employment at Kaisercraft, I have been the only web developer, as such everything you see at <a href="http://www.kaisercraft.com.au">the kaisercraft website</a> was created by me.<br/>\
      Also note if you would like to view my accomplishments developing the backend of the website, please contact me and I can arrange this along with written authorisation from the Director.</div>\
      '+getSwitchButtons(false)+'\
    ');

  addGroup("Personal Projects",'\
    <div class="page-header">\
      <h1>Personal Projects</h1>\
    </div>\
    <div class="row-fluid clearfix row-margin-hack">\
    <div class="col-sm-5 col-sm-offset-1"><img class="pull-right lab-icon" src="/static/img/resume/lab.png"/></div>\
    <div class="col-sm-5">\
    <h3><a href="http://lab.kaiserapps.com">Kaiserapps Lab</a></h3>\
    <p>My <a href="http://lab.kaiserapps.com">lab</a> is where I keep all my HTML5 canvas and three.js experiments. One of them is actually the background animation on this page!\
    <br/>This is probably the area of programming I have had the most enjoyment. I have always wanted to make animations and games, but it was not truly simple until I found HTML5 canvas and Three.js.\
    </p></div>\
    </div>\
    <div class="row-fluid clearfix text-right-hack row-margin-hack">\
    <div class="col-sm-5 col-sm-offset-1">\
    <h2><a href="https://github.com/benkaiser/">Github Projects</a></h2>\
    <p>I keep all my open source creations on Github. Some of the more popular ones are my node.js based music player (<a href="https://github.com/benkaiser/node-music-player">node-music-player</a>),\
    and my node.js based server that allows you to remotely control control functionality on another computer (<a href="https://github.com/benkaiser/desktop-command-remote">desktop-command-remote</a>).<p>\
    </div><div class="col-sm-5">\
    <img class="pull-left no-box-shadow" src="/static/img/resume/octocat.png"></img>\
    </div></div>\
    <div class="row-fluid clearfix row-margin-hack">\
    <div class="col-sm-5 col-sm-offset-1"><img class="pull-right lab-icon" src="/static/img/resume/webdevtools.png"/></div>\
    <div class="col-sm-5">\
    <h3><a href="https://chrome.google.com/webstore/search/kaiserapps">Chrome Apps</a></h3>\
    <p>I have 5 Chrome apps and 1 Chrome extension that I have made over the past few years. Two of which have almost 10,000 weekly users each.\
    </p></div>\
    </div>\
    '+getSwitchButtons(false)+'\
    ');

  //<img src="/static/img/resume/mug_shot_3_small.jpg" class="pull-right" id="mug_shot_2"/>

  addGroup("Me!",'\
    <div class="page-header">\
      <h1>About Me</h1>\
    </div>\
    <div class="clearfix">\
    <div class="row-fluid clearfix"><div class="col-sm-5 col-sm-offset-1 text-right-hack"><h2>I am a dancer</h2>\
    <p>Back in late 2009 I started learning how to street dance in several styles such as Shuffling, Liquid Rave, Tecktonik and others. These have progressed over the past few years and the video to the right is a dedication I made to a friend of mine in late 2011.</p></div>\
    <div class="col-sm-6"><iframe width="519" height="292" src="http://www.youtube.com/embed/pLs73kMJb_g?theme=light&color=white" frameborder="0" allowfullscreen></iframe>\
    </div></div>\
    <div class="row-fluid clearfix row-margin-hack"><div class="col-sm-6 text-right-hack">\
    <iframe width="519" height="292" src="http://www.youtube.com/embed/lHAWDkAIn78?theme=light&color=white" frameborder="0" allowfullscreen></iframe>\
    </div><div class="col-sm-5">\
    <h2>Listen2Learners</h2>\
    <p>In 2010 I was chosen to attended an event called <a href="http://www.heppell.net/bva/bva7">Listen2Learners bva7</a>. This was an event hosted by the Victorian Department of Education. To be chosen for the event, a school had to show a technology project their students were working on.\
    I put in an application with my then iPhone app I had been working on. The event was about students showing how their use of technology could be used throughout the schooling system. Here is a video interview with me representing my then high school on the day.\
    <br/>For more on the event please visit <a href="http://www.heppell.net/bva/bva7/western-heights">this link.</a>\
    </p>\
    </div></div>\
    <div class="row-fluid clearfix row-margin-hack"><div class="col-sm-5 col-sm-offset-1 text-right-hack">\
    <h2>Slurpees!</h2>\
    <p>My favourite beverage is 7-Eleven Cola Slurpees. To the right is a picture of me with a 6 Litre Slurpee on 7-Eleven\'s BYO cup day.</p></div>\
    <div class="col-sm-6">\
    <img class="" src="/static/img/resume/slurpee_small.jpg" alt="me drinking a slurpee"/>\
    </div></div>\
    <div class="row-fluid row-margin-hack clearfix">\
    <h2>What Tech I Run On</h2>\
    <table class="table">\
    <tr><th>Item</th><th>I Use</th><th>Running</th></tr>\
    <tr><td>Desktop</td><td>Custom Built PC</td><td>Arch Linux and Windows 8</td></tr>\
    <tr><td>Laptop</td><td>Samsung Series 9 (2012)</td><td>Arch Linux and Windows 7</td></tr>\
    <tr><td>Phone</td><td>LG Nexus 5</td><td>Paranoid Android 4.0 (KitKat 4.4)</td></tr>\
    </table>\
    </div>\
    </div>\
    '+getSwitchButtons(false)+'\
    ');

  addGroup("Contact Information",'\
    <div class="page-header">\
      <h1>Contact Information and Online Profiles</h1>\
    </div>\
    <div class="row-fluid">\
    <div class="col-sm-12"><address>\
    <strong>Benjamin Kaiser</strong><br/>\
    Geelong, Victoria<br/>\
    Email: <a href="emailto:benjaminjkaiser@gmail.com">benjaminjkaiser@gmail.com</a><br/>\
    Mobile: (+61) 0432 598 381<br/>\
    <a target="blank" href="http://www.blog.kaiserapps.com">Blog</a><br/>\
    <a target="blank" href="http://stackoverflow.com/users/485048/benjamin-kaiser">StackOverflow</a><br/>\
    <a target="blank" href="https://github.com/benkaiser">Github</a><br/>\
    <a target="blank" href="https://plus.google.com/111187907454451878117/">Google+</a><br/>\
    </address></div>\
    </div>\
    '+getSwitchButtons(true)+'\
    ')

  if(window.location.hash) {
    var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
    changeTo(hash, true);
  } else {
    changeTo(0, true);
  }
  refreshMenu();
});

function printall(){
  joint = "<p>Please visit <a href='http://lab.kaiserapps.com/resume'>the original web resume</a> for the full experience.</p>";
  for(i in content){
    joint += content[i].text;
  }
  $("#print-content").html(joint);
  $("p").filter(".switchbuttons").remove()
}

// function in case I wanted to change all of the units in one spot
function getUnit(code, year, name, grade, uni){
  return "<tr><td><i class='icon-file'></i><a href='https://www.open.edu.au/unit/pdf/"+code+"-"+year+"'>"+code+"</a></td><td>"+name+"</td><td>" + grade + "</td>" + (uni.length > 0 ? "<td>"+uni+"</td>" : "") + "</tr>";
}

// standard area for previous and next buttons
function getSwitchButtons(islast){
  return '<p class="switchbuttons">\
      <span class="btn btn-primary btn-large" onclick="changePrevious()"><i class="icon-white icon-arrow-left"></i> Previous</span>\
      ' + (!islast ? '<span class="btn btn-primary btn-large pull-right" onclick="changeNext()">Next <i class="icon-white icon-arrow-right"></i></span>' : '') + '\
      </p>';
}

function addGroup(name, text){
  var tmp = {
    name: name,
    text: text
  };
  content.push(tmp);
}

function refreshMenu(){
  $("#resume-parts").html("");
  built = "";
  for (i in content){
    built += "<li><a href='#"+i+"' onclick='changeTo("+i+")'>"+content[i].name+"</a><li>";
  }
  $("#resume-parts").html(built);
}

function changeTo(index, instant){
  latest = index;
  $("#content-next").html($("#content-current").html());
  $("#content-current").fadeOut(0);
  $("#content-next").fadeIn(0);
  // how long is the fadout?
  var fadeout = 500;
  if(instant){
    fadeout = 0;
  }
  $("#content-next").fadeOut(fadeout,function(){
    $("#content-current").html(content[index].text);
    $("#content-current").fadeIn(500);
    if(index == 0){
      $("#previousID").hide();
      $("#nextID").show();
      $("#nextID").attr("href", "#1");
    } else if (index+1 == content.length){
      $("#nextID").hide();
      $("#previousID").show();
      $("#previousID").attr("href", "#"+(content.length-1));
    } else {
      $("#nextID").show();
      $("#previousID").show();
      $("#nextID").attr("href", "#"+(index+1));
      $("#previousID").attr("href", "#"+(index-1));
    }
  });
}

function changeNext(){
  changeTo(latest+1);
}
function changePrevious(){
  changeTo(latest-1);
}
