var app = null;

module.exports = function(app_ref){
  app = app_ref;
  // home page
  app.get("/", function(req, res){
    res.render('index', { menu: true });
  });
  // contact
  app.get("/contact", function(req, res){
    res.render('contact', { menu: true });
  });
  // resume
  app.get("/resume", function(req, res){
    res.render('resume');
  });
  // alias for resume
  app.get("/fun/resume", function(req, res){ res.redirect("/resume")});
  // main lab page
  app.get("/lab", function(req, res){
    res.render('lab');
  });
  app.get("/lab/:experiment", function(req, res){
    res.render('experiments/' + req.params.experiment, {experiment: req.params.experiment});
  });
}
