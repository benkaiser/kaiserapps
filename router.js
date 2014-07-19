var app = null;

module.exports = function(app_ref){
  app = app_ref;
  app.get("/", function(req, res){
    res.render('index', { menu: true });
  })
  app.get("/resume", function(req, res){
    res.render('resume');
  })
}
