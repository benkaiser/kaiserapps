var express  = require('express.io');
var fs       = require('fs');
var path     = require('path');

app = express();

app.http().io();

app.configure(function(){
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  // all environments
  app.set('port', process.env.PORT || 2001);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'html');
  app.set('root', __dirname);
  app.engine('html', require('swig').renderFile);
  app.use('/static', express.static(path.join(__dirname, 'static')));
});

// require(__dirname + "/xpressen.js").init(app);
require('./router')(app);

// run the class
app.listen(app.get('port'), null, function(){
  console.log("Server running on port " + app.get('port'));
});
