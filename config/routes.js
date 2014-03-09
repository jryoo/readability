var score = require('../app/readabilityScore/readabilityScore');

module.exports = function (app) {
    app.post('/score/url', score.url);
    app.post('/score/image', score.image);
};