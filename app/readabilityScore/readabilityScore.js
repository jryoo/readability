var async    = require('async');
var textStat = require('text-statistics');
var read = require('node-readability');

var Diffbot = require('diffbot').Diffbot;
var diffbot = new Diffbot('ca40d8a8c2fae1bff5c4a2af94a2c611');

exports.create = function(req, res){
    var params = req.body;
    var readlevel = null;

    console.log("[POST/score] Params: ");
    console.dir(params);


    diffbot.article({uri: params.link}, function(err, response) {
        console.log(response.title);
        console.log(response.text);
        text = response.text;

        var ts = textStat(text);

        if (ts.wordCount() < 50) {
            res.send(200, {message: "not enough words"});
            return;
        }
    
        var fkgl = ts.fleschKincaidGradeLevel();
        var gfs = ts.gunningFogScore();
        var cli = ts.colemanLiauIndex();
        var si = ts.smogIndex();    
        var ari = ts.automatedReadabilityIndex();

        console.log("[POST/score] scores: fkgl:" + fkgl + ", gfs:" + gfs + ", cli:" + cli + ", si:" + si + ", ari:" + ari);

        avgGradeLvl = (fkgl + gfs + cli + si + ari)/5;



        res.send(200, {score: avgGradeLvl});
    });
};