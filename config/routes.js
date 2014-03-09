module.exports = function (app) {
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
            readlevel = ts.fleschKincaidGradeLevel();
            res.send(200, {score: readlevel});
        });
    });
};