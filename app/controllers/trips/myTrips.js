var express = require('express');
var myTrips = new express.Router();

myTrips.use(function(req, res, next){
    if (req.userData) {
        next();
      }
      else {
        res.status(401).send("Not authorized!");
      }
});

myTrips.get('/', function(req, res) {
    var db = require("../../dbUtils/crud");
    db.users.findOne({username: req.userData.username}, function(err, user){
        if(user.myTrips) {
            res.send(JSON.stringify(user.myTrips));
        }
        else {
            res.send("[]");
        }
    });
});

function has(list, item) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].url === item.url) {
      return true;
    }
  }
  return false;
}

myTrips.post('/:id', function(req, res) {
    var db = require("../../dbUtils/crud");
    db.users.findOne({username:req.userData.username}, function(err, user){
        var id = require("mongodb").ObjectID(req.params.id);
        db.trips.findOne({_id: id}, function(err, trip){
            var listTrips = user.myTrips;
            if (!listTrips) {
                listTrips = [];
            }
            if (trip) {
                if(has(listTrips, trip)) {
                    res.end();
                }
                else {
                    listTrips.push({
                      id: req.params.id,
                      url: trip.url
                    });
                    db.users.update({username: user.username}, {$set: {myTrips:listTrips}}, function(){
                        res.end();
                    });
                }
            }
            else {
                res.end();
            }
        });
    });
});

myTrips.delete('/:id', function(req, res) {
    var db = require("../../dbUtils/crud");
    db.users.findOne({username:req.userData.username}, function(err, user){
        if (!user) {
          res.end();
        }
        var listTrips = user.myTrips;
        if (!listTrips) {
            listTrips = [];
        }
        var updatedList = [];
        for (var i = 0; i < listTrips.length; i++) {
          if (listTrips[i].id !== req.params.id) {
            updatedList.push(listTrips[i]);
          }
        }
        db.users.update({username:req.userData.username}, {$set: {myTrips: updatedList}}, function() {
          res.end();
        });
    });
});

module.exports = myTrips;
