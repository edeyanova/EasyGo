var mongoIp = 'localhost';
var dbName = 'example';
var dbUrl1 = 'mongodb://' + mongoIp + ':27017/' + dbName;

var dbUrl = 'mongodb://pineapple:12345678@ds211088.mlab.com:11088/example'

var MongoClient = require('mongodb').MongoClient;

module.exports.core = function(query, callback, collectionName) {
    MongoClient.connect(dbUrl, function(err, db) {
        db.collection(collectionName, function(err, collection) {
            query(collection, callback);
            db.close();
        });
    });
};

module.exports.findOne = function(query, callback, collectionName) {
    module.exports.core(function(col, cb) {
        col.findOne(query, cb);
    },
    callback, collectionName);
};

module.exports.find = function(query, callback, collectionName) {
    module.exports.core(function(col, cb) {
        col.find(query, cb);
    },
    callback, collectionName);
};

module.exports.findAll = function(query, callback, collectionName) {
    module.exports.count(query, function(err, cnt) {
        l = [];
        if (cnt === 0) {
            callback(l);
            return;
        }
        module.exports.find(query, function(err, it) {
            it.forEach(function(val) {
                l.push(val);
                if (l.length === cnt) {
                    callback(l);
                }
            });
        }, collectionName);
    }, collectionName);
}

module.exports.count = function(query, callback, collectionName) {
    module.exports.core(function(col, cb) {
        col.count(query, cb);
    },
    callback, collectionName);
};

module.exports.insert = function(obj, callback, collectionName) {
    module.exports.core(function(col, cb) {
        col.insert(obj, cb);
    }, callback, collectionName);
};

module.exports.update = function(query, update, callback, collectionName) {
    module.exports.core(function(col, cb) {
        col.update(query, update, cb);
    }, callback, collectionName);
};

module.exports.delete = function(query, callback, collectionName) {
    module.exports.core(function(col, cb, collectionName) {
        col.remove(query, cb);
    }, callback, collectionName);
};
