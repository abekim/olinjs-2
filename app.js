
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var schema = mongoose.Schema({ name: 'string' });
var Cat = mongoose.model('Cat', schema);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/users/new', user.new)
app.post('/cats/new', function(req, res) {
  console.log(req);
  
  var kitty = new Cat({ name: req.body.catName });
  kitty.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  return res.send(kitty.name+" says hi")
});
// app.post('/cats/new', function(req, res) {


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
