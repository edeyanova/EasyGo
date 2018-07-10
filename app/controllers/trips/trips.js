var express = require('express');
var trips = new express.Router();

trips.use('/myTrips', require('./myTrips'));
trips.get('/', function(req, res) {

    var PythonShell = require('python-shell');

    var answers = [];
    answers.push(req.query.q1);
    answers.push(req.query.q2);
    answers.push(req.query.q3);
    answers.push(req.query.q4);
    answers.push(req.query.q5);
    answers.push(req.query.q6);
    answers.push(req.query.q7);
    answers.push(req.query.q8);
    for (var i = 0; i < answers.length; i++) {
        if (!answers[i]) {
            answers[i] = 0;
        }
        else if (answers[i] === 'Yes') {
            answers[i] = 1;
        }
        else if (answers[i] === 'No') {
            answers[i] = -1;
        }
        else {
            answers[i] = 0;
        }
    }

    var tmp = [];
    for (var i = 0; i < answers.length; i++) {
        tmp.push(answers[i]);
        tmp.push(answers[i]);
        tmp.push(answers[i]);
    }
    answers = tmp;

    function response() {
        var request = require('request');
        request('https://damp-hamlet-71549.herokuapp.com/fromdb', function(err, code, body) {

            if (err || !body) {
                setTimeout(function() {
                    response();
                }, 1000);
            }

            var data = JSON.parse(body);
            var Heap = require('heap');

            var heap = new Heap(function(a, b) {
                function dotProduct(x, y) {
                    var res = 0;
                    for (var i = 0; i < x.length; i++) {
                        res = res + x[i] * y[i];
                    }
                    return res;
                }
                return dotProduct(answers, b.vector) - dotProduct(answers, a.vector);
            });

            for (var i = 0; i < data.length; i++) {
                if (data[i].state === 'ok' && data[i].vector) {
                    heap.push(data[i]);
                }
            }
            var chosen = [heap.pop(), heap.pop(), heap.pop(), heap.pop(), heap.pop(), heap.pop()];

            function getDomain(url) {
                var arr = url.split("/");
                return arr[2];
            }

            for (var i = 0; i < chosen.length; i++) {
                var db = require('../../dbUtils/crud');
                if (!chosen[i].picked) {
                    chosen[i].picked = 1;
                }
                else {
                    chosen[i].picked = chosen[i].picked + 1;
                }
                var id = require('mongodb').ObjectId(chosen[i]._id);
                var db = require('../../dbUtils/crud');
                db.trips.update({_id: id}, {$set: {picked: chosen[i].picked}}, function() {});
            }

            var index = 0;
            function updateDomain() {
                if (index < chosen.length) {
                    var db = require('../../dbUtils/crud');
                    var domainName = getDomain(chosen[index].url);
                    console.log(domainName);
                    db.domains.findOne({domain: domainName}, function(err, domain) {
                        if (domain) {
                            if (domain.picked) {
                                domain.picked = domain.picked + 1;
                            }
                            else {
                                domain.picked = 1;
                            }
                            db.domains.update({domain: domainName}, {$set: {picked: domain.picked}}, function() {
                                index++;
                                updateDomain();
                            });
                        }
                        else {
                            db.domains.insert({domain: domainName, picked: 1}, function() {
                                index++;
                                updateDomain();
                            });
                        }
                    });
                }
            }
            updateDomain();
            res.render("trips/recommendations", {info: req.userData, trips: JSON.stringify(chosen)});
        });
    }
    response();
});

trips.post('/tag/:id', function(req, res) {
    var id = new require('mongodb').ObjectID(req.params.id);
    var db = require('../../dbUtils/crud');
    console.log(req.body);
    db.trips.findOne({_id: id}, function(err, trip) {
        var toSave = trip.tags;
        if (!toSave) {
            toSave = {};
        }
        for (var property in req.body) {
            if (toSave[property]) {
                toSave[property] = toSave[property] + 1;
            }
            else {
                toSave[property] = 1;
            }
        }

        var Heap = require('heap');

        var heap = new Heap(function(a, b) {
            //{tag: 'sea', votes: 3}
            return b.votes - a.votes;
        });

        for (var property in toSave) {
            heap.push({tag: property, votes: toSave[property]});
        }

        var dominant = [];
        var n = 0;
        while(!heap.empty() && n < 3) {
            dominant.push(heap.pop().tag);
            n += 1;
        }

        db.trips.update({_id: id}, {$set: {tags: toSave, dominant: dominant}}, function() {
            res.send("ok");
        });
    });
})

module.exports = trips;
