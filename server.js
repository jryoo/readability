var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3020);
app.set('views', path.join(__dirname, ''));
app.engine('html', require('ejs').renderFile);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());


app.use(app.router);
app.configure(function() {
  app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
    res.send(200, {});
});

app.post('/score', function(req, res){
    var params = req.body;
    console.log("")
    res.send(200, {score: 9});
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});