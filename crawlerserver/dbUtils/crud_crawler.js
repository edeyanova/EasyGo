var time = 0;
var locked = false;
var period = 2000;

function currentTime() {
    var d = new Date();
    var n = d.getTime();
}

var crud = require('./crud');

var scripts = {};
scripts.findOne = function(query, callback) {
  
    if (locked) {
        setTimeout(function() {
            scripts.findOne(query, callback);
        }, period);
        return;
    }
    var timeToWait = time + period - currentTime();
    if (timeToWait > 0) {
        setTimeout(function() {
            scripts.findOne(query, callback);
        }, timeToWait);
        return;
    }

    locked = true;
    crud.scripts.findOne(query, function(err, data) {
        time = currentTime();
        locked = false;
        callback(err, data);
    });
};

scripts.find = function(query, callback) {
    
      if (locked) {
          setTimeout(function() {
              scripts.find(query, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
              scripts.find(query, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.scripts.find(query, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

scripts.findAll = function(query, callback) {
    
      if (locked) {
          setTimeout(function() {
              scripts.findAll(query, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
              scripts.findAll(query, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.scripts.findAll(query, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

scripts.count = function(query, callback) {
    
      if (locked) {
          setTimeout(function() {
              scripts.count(query, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
              scripts.count(query, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.scripts.count(query, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

scripts.insert = function(obj, callback) {
    
      if (locked) {
          setTimeout(function() {
              scripts.insert(obj, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
              scripts.insert(obj, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.scripts.insert(obj, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

scripts.update = function(query, update, callback) {
    
      if (locked) {
          setTimeout(function() {
              scripts.update(query, update, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
              scripts.update(query, update, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.scripts.update(query, update, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

scripts.delete = function(query, callback) {
    
      if (locked) {
          setTimeout(function() {
              scripts.delete(query, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
              scripts.delete(query, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.scripts.delete(query, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

var trips = {};
trips.findOne = function(query, callback) {
  
    if (locked) {
        setTimeout(function() {
            trips.findOne(query, callback);
        }, period);
        return;
    }
    var timeToWait = time + period - currentTime();
    if (timeToWait > 0) {
        setTimeout(function() {
            trips.findOne(query, callback);
        }, timeToWait);
        return;
    }

    locked = true;
    crud.trips.findOne(query, function(err, data) {
        time = currentTime();
        locked = false;
        callback(err, data);
    });
};

trips.find = function(query, callback) {
    
      if (locked) {
          setTimeout(function() {
            trips.find(query, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
            trips.find(query, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.trips.find(query, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

trips.findAll = function(query, callback) {
    
      if (locked) {
          setTimeout(function() {
            trips.findAll(query, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
            trips.findAll(query, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.trips.findAll(query, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

trips.count = function(query, callback) {
    
      if (locked) {
          setTimeout(function() {
            trips.count(query, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
            trips.count(query, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.trips.count(query, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

trips.insert = function(obj, callback) {
    
      if (locked) {
          setTimeout(function() {
            trips.insert(obj, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
            trips.insert(obj, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.trips.insert(obj, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

trips.update = function(query, update, callback) {
    
      if (locked) {
          setTimeout(function() {
            trips.update(query, update, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
            trips.update(query, update, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.trips.update(query, update, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

trips.delete = function(query, callback) {
    
      if (locked) {
          setTimeout(function() {
            trips.delete(query, callback);
          }, period);
          return;
      }
      var timeToWait = time + period - currentTime();
      if (timeToWait > 0) {
          setTimeout(function() {
            trips.delete(query, callback);
          }, timeToWait);
          return;
      }
  
      locked = true;
      crud.trips.delete(query, function(err, data) {
          time = currentTime();
          locked = false;
          callback(err, data);
      });
  };

module.exports.scripts = scripts;
module.exports.trips = trips;