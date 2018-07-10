var express = require("express");
var app = express();

var dbUrl = 'mongodb://pineapple:12345678@ds211088.mlab.com:11088/example';

var MongoClient = require('mongodb').MongoClient;

function findTrip(tripId, callback) {
    MongoClient.connect(dbUrl, function(err, db) {
    	if (err) {
    		db.close();
    		return;
    	}
        db.collection('trips', function(err, collection) {
            if (err) {
        		db.close();
        		return;
        	}
            try {
                var id = require('mongodb').ObjectId(tripId);
            }
            catch (error) {
                db.close();
                callback(null);
                return;
            }
            collection.findOne({_id: id}, function(err, trip) {
            	if (err) {
            		callback(null);
            	}
            	else {
            		callback(trip);
            	}
            	db.close();
            });
        });
    });
};

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/test', function(req, res) {
    res.send('<iframe src="https://warm-meadow-88564.herokuapp.com/easyGoId/5a84aa990a5c8f00146c270c" width="1000" height="1000"></iframe> <iframe src="https://warm-meadow-88564.herokuapp.com/easyGoId/5a84ad450a5c8f00146c2732" width="1000" height="1000"></iframe>')
});

app.get('/easyGoId/:id', function (req, res) {
	findTrip(req.params.id, function(trip){
		if (!trip) {
			res.status(500);
			res.end();
			return;
		}
		var request = require('request');
		request(trip.url, function(error, response, body) {
			if (error) {
				res.status(500);
				res.end();
				return;
			}
            res.cookie('site', trip.url);
			res.send(body);
		});
	});
});

app.use(function (req, res) {
    function getDomain(url) {
      var arr = url.split("/");
      return arr[0] + '//' + arr[2];
    }

    res.redirect(getDomain(req.cookies.site) + req.originalUrl);
});

app.listen(process.env.PORT || 5000, function(argument) {
	console.log('Server is working...');
});