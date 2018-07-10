var utils = require('./crudAux');

var users = {};
users.findOne = function(query, callback) {
    utils.findOne(query, callback, 'users');
};

users.find = function(query, callback) {
    utils.find(query, callback, 'users');
};

users.findAll = function(query, callback) {
    utils.findAll(query, callback, 'users');
}

users.count = function(query, callback) {
    utils.count(query, callback, 'users');
};

users.insert = function(obj, callback) {
    utils.insert(obj, callback, 'users');
};

users.update = function(query, update, callback) {
    utils.update(query, update, callback, 'users');
};

users.delete = function(query, callback) {
    utils.delete(query, callback, 'users');
};

var locations = {};
locations.findOne = function(query, callback) {
    utils.findOne(query, callback, 'locations');
};

locations.find = function(query, callback) {
    utils.find(query, callback, 'locations');
};

locations.findAll = function(query, callback) {
    utils.findAll(query, callback, 'locations');
}

locations.count = function(query, callback) {
    utils.count(query, callback, 'locations');
};

locations.insert = function(obj, callback) {
    utils.insert(obj, callback, 'locations');
};

locations.update = function(query, update, callback) {
    utils.update(query, update, callback, 'locations');
};

locations.delete = function(query, callback) {
    utils.delete(query, callback, 'locations');
};

var scripts = {};
scripts.findOne = function(query, callback) {
    utils.findOne(query, callback, 'scripts');
};

scripts.find = function(query, callback) {
    utils.find(query, callback, 'scripts');
};

scripts.findAll = function(query, callback) {
    utils.findAll(query, callback, 'scripts');
}

scripts.count = function(query, callback) {
    utils.count(query, callback, 'scripts');
};

scripts.insert = function(obj, callback) {
    utils.insert(obj, callback, 'scripts');
};

scripts.update = function(query, update, callback) {
    utils.update(query, update, callback, 'scripts');
};

scripts.delete = function(query, callback) {
    utils.delete(query, callback, 'scripts');
};


var trips = {};
trips.findOne = function(query, callback) {
    utils.findOne(query, callback, 'trips');
};

trips.find = function(query, callback) {
    utils.find(query, callback, 'trips');
};

trips.findAll = function(query, callback) {
    utils.findAll(query, callback, 'trips');
}

trips.count = function(query, callback) {
    utils.count(query, callback, 'trips');
};

trips.insert = function(obj, callback) {
    utils.insert(obj, callback, 'trips');
};

trips.update = function(query, update, callback) {
    utils.update(query, update, callback, 'trips');
};

trips.delete = function(query, callback) {
    utils.delete(query, callback, 'trips');
};

var domains = {};
domains.findOne = function(query, callback) {
    utils.findOne(query, callback, 'domains');
};

domains.find = function(query, callback) {
    utils.find(query, callback, 'domains');
};

domains.findAll = function(query, callback) {
    utils.findAll(query, callback, 'domains');
}

domains.count = function(query, callback) {
    utils.count(query, callback, 'domains');
};

domains.insert = function(obj, callback) {
    utils.insert(obj, callback, 'domains');
};

domains.update = function(query, update, callback) {
    utils.update(query, update, callback, 'domains');
};

domains.delete = function(query, callback) {
    utils.delete(query, callback, 'domains');
};

module.exports.users = users;
module.exports.locations = locations;
module.exports.scripts = scripts;
module.exports.trips = trips;
module.exports.domains = domains;