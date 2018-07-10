var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/crawler/test', function(req, res) {
    console.log(req.body);

    var request = require('request');
    var URL = require('url-parse');
    var cheerio = require('cheerio');
    var utils = require('./utils');
    eval(req.body.code);

    request(req.body.url, function(error, response, body) {
        if(error) {
            res.send(String(error));
            return;
        }
        if(response.statusCode === 200) {
          try {
            var result = f(body);
            res.send(String(result));
          }
          catch (exception) {
            res.send(String(exception));
          }
        }
    });
});

function storeTrip(url, script) {
    var db = require('./dbUtils/crud');
    db.trips.findOne({url: url}, function(err, data) {
        if (data) {
            if (data.state !== 'ok') {
                db.trips.update({url: url}, {$set: {script: script, state: 'ok'}}, function() {
                    require('./updateDescription')(url);
                });
            }
            else {
                db.trips.update({url: url}, {$set: {script: script}}, function() {});
            }
        }
        else {
            db.trips.insert({url: url, script: script, state: 'ok'}, function() {
                require('./updateDescription')(url);
            });
        }
    });
}

app.post('/crawler/register', function(req, res) {
    var db = require('./dbUtils/crud');

    var trips = JSON.parse(req.body.urls);
    var code = req.body.code;

    db.scripts.insert({code: code}, function(err, data) {
        var id = data.insertedIds[0];

        for (var i = 0; i < trips.length; i++) {
            console.log('Storing trip ', trips[i]);
            storeTrip(trips[i], id);
        }
    });
    res.end('ok');
});

app.get('/fromdb', function(req, res) {
    var db = require('./dbUtils/crud');
    db.trips.findAll({}, function(data) {
        res.send(JSON.stringify(data));
    });
});

app.listen(process.env.PORT || 5000);

function start() {
    var db = require('./dbUtils/crud');
    var updateDescriptions = require('./updateDescription');
    db.trips.findAll({}, function(data) {
        console.log('fgewger');
        for (var i = 0; i < data.length; i++) {
            updateDescriptions(data[i].url);
        }
    });
}

start();
