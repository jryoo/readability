var async    = require('async');
var textStat = require('text-statistics');

var Diffbot = require('diffbot').Diffbot;
var diffbot = new Diffbot('ca40d8a8c2fae1bff5c4a2af94a2c611');

var tesseract = require('node-tesseract');

var fs = require('fs');
var uuid = require('node-uuid');

var getGradeLevel = function(text) {
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
    return avgGradeLvl;
}

exports.create = function(req, res) {
    var params = req.body;
    var readlevel = null;

    console.log("[POST/score] Params: ");
    console.dir(params);

    if (params.link === undefined) {
        res.send(200, {message: "not enough words"});
        return;
    }


    diffbot.article({uri: params.link}, function(err, response) {

        if (err) {
            console.log("[POST/score] (diffbot) ERROR: " + err);
            res.send(500);
            return;
        }

        console.log(response.title);
        console.log(response.text);
        text = response.text;

        res.send(200, {score: getGradeLevel(text)});
    });
};

exports.image = function(req, res) {
    var params = req.body;
    console.log("[POST/image] Params: ");
    console.dir(params);

    if (params.base64 === undefined) {
        res.send(200, {message: "not enough words"});
        return;
    }

    var buf = new Buffer(params.base64, 'base64');
    var tmpFileName = "/tmp/" + uuid.v1() + ".jpg";

    fs.writeFile(tmpFileName, buf, function(err) {
        if(err) {
            console.log("[POST/image] (fs) ERROR: " + err);
            res.send(500);
            return;
        } else {
            tesseract.process(tmpFileName ,function(err, text) {
                if(err) {
                    console.error(err);
                    res.send(500);
                    return;
                } else {
                    console.log(text);
                    res.send(200, {score: getGradeLevel(text)});
                }
                res.send(500);
            });

        }
    });
}