var express = require('express');
var proxy = new express.Router();

proxy.get('/:id', function(req, res) {
    var db = require('../../dbUtils/crud');
    db.trips.findOne({_id: require('mongodb').ObjectId(req.params.id)}, function(e, trip) {
        var request = require('request');
        request(trip.url, function(error, code, body) {
            res.send(body);
        });
    });
});

module.exports = proxy;