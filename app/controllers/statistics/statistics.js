var express = require('express');

var statistics = new express.Router();

statistics.get('/', function(req, res) {
    if (req.userData && req.userData.role === 'user') {
        res.end('Ordinary User page');
    }
    else if (req.userData && req.userData.role === 'admin') {

      var MongoClient = require('mongodb').MongoClient;
      MongoClient.connect('mongodb://pineapple:12345678@ds211088.mlab.com:11088/example', function(err, db) {
        if (err) throw err;
        var dbo = db.db("example");
        dbo.collection("trips").find({}).sort({picked: -1}).toArray(function(err, data) {
          console.log(data);
          if (err) throw err;

          var crud = require('../../dbUtils/crud');
          crud.domains.findAll({}, function(domains) {
              console.log(domains);
              res.render('statistics/statistics', {trips: data, domains: domains});
          });

          db.close();
        });
      });
      
    }
    else {
        res.redirect('/logins');
    }
});

module.exports = statistics;
