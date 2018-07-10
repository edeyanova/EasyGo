var express = require('express');

var index = new express.Router();

index.use(function(req, res, next) {
    if (req.url !== '/') {
        res.redirect('/');
    }
    else {
        next();
    }
});

index.get('/', function(req, res) {
    res.render("index/index", {info: req.userData});

});

module.exports = index;
