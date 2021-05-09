"use strict";
var controller = require('../controller/people');

module.exports = function(app) {
    app.post('/api/people', controller.create);
    app.get('/api/people', controller.list);    
}