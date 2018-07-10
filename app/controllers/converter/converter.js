var express = require('express');
var converter = new express.Router();

converter.get('/', function(req, res) {
    res.render("converter/converter", {info: req.userData});
}
);

module.exports = converter;
