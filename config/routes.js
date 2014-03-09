var score = require('../app/readabilityScore/readabilityScore');

module.exports = function (app) {
    app.post('/score', score.create);
};