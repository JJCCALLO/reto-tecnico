"use strict";
var controller = require('../controller/films');

module.exports = function(app) {
    app.post('/api/films', controller.create);   
    app.get('/api/films', controller.list);     
}