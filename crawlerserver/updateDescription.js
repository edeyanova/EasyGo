var queue = []; // {description: , function: }
var sent = 0;
var started = false;

function sendRequest() {
  if (queue.length > 0 && sent <= 1) {
    var current = queue.shift();

    var post = require('easy-post-request');

    post('https://sleepy-caverns-92724.herokuapp.com/', current.description).
      then(function(vector) {
        sent--;
        current.callback(vector);
      }).catch(function (err) {
           console.error(err);
    });
    sent++;
  }

  setTimeout(function() {
    sendRequest();
  }, 1000);
}

function updateTripDescription(url) {
    var db = require('./dbUtils/crud_crawler');
    db.trips.findOne({url: url}, function(err, trip) {
        if (!trip) {
            console.log('trip not found');
            setTimeout(function() {
                updateTripDescription(url);
            }, 1000);
            return;
        }
        db.scripts.findOne({_id: trip.script}, function(err, script) {
            if (!script) {
                console.log('script not found');
                setTimeout(function() {
                    updateTripDescription(url);
                }, 1000);
                return;
            }
            var request = require('request');
            var cheerio = require('cheerio');
            var utils = require('./utils');
            eval(script.code);
            request(trip.url, function(err, code, body) {
                if (err) {
                    console.log(err);
                    db.trips.update({_id: trip._id}, {$set: {state: 'url problem'}}, function() {});
                    return;
                }
                try {
                    var description = f(body);
                    description = utils.filter(description, function(x) {
                        return !!x;
                    });
                    if (description.length === 0) {
                        db.trips.update({_id: trip._id}, {$set: {state: 'crawler problem'}}, function() {});
                        return;
                    }
                    var tmp = '';
                    for (var i = 0; i < description.length; i++) {
                      tmp += description[i] + ' ';
                    }
                    description = tmp;

                    queue.push(
                      {
                        description: description,
                        callback: function(vector) {
                            console.log('updating ', trip.url, ' with ', vector);
                            db.trips.update({_id: trip._id}, {$set: {vector: vector}}, function() {
                                  setTimeout(function () {
                                  updateTripDescription(url);
                              }, 30000);
                            });
                        }
                      }
                    );
                    if (!started) {
                      sendRequest();
                      started = true;
                    }
                }
                catch(exception) {
                    console.log(exception);
                    db.trips.update({_id: trip._id}, {$set: {state: 'crawler problem'}}, function() {});
                    return;
                }
            });
        });
    });
}

module.exports = updateTripDescription;
