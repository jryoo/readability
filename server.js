var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var router = require('./config/routes');
var textStat = require('text-statistics');
var Boilerpipe = require('boilerpipe');
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

app.get('/', function(req, res){
    res.send(200, {});
});

app.post('/score', function(req, res){
    var params = req.body;
    var readlevel = null;

    console.log("[POST/score] Params: ");
    console.dir(params);

    var boilerpipe = new Boilerpipe({
        extractor: Boilerpipe.Extractor.Article,
        url: params.link
    });

    boilerpipe.getText(function(err, text) {
        if (err) {
            console.log("[POST/score] ERROR: (boilerpipe)" + err);
            res.send(500);
            return;
        }
        console.log("[POST/score] boilerpipe.err: " + err);
        console.log("[POST/score] boilerpipe.text: " + text);
        var ts = textStat(text);
	
        fkgl = ts.fleschKincaidGradeLevel();
	gfs = ts.gunningFogScore();
	cli = ts.colemanLiauIndex();
	si = ts.smogIndex();	
	ari = automatedReadabilityIndex();

	avgGradeLvl = (fkgl + gfs + cli + si + ari)/5;
        res.send(200, {score: avgGradeLvl});
    });
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
