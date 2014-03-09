var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var router = require('./config/routes');
var server = null;


// all environments
app.set('port', process.env.PORT || 3020);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, ''));
app.engine('html', require('ejs').renderFile);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

router(app);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
