function filterElements(elems, predicate) {
    res = [];
    for (var i = 0; i < elems.length; i++) {
        if (predicate(elems[i])) {
        res.push(elems[i]);
        }
    }
    return res;
}

function children(elems) {
    res = [];
    for (var i = 0; i < elems.length; i++) {
        res = res.concat(elems[i].children);
    }
    return res;
}

function map(elems, func) {
    res = [];
    for (var i = 0; i < elems.length; i++) {
        res.push(func(elems[i]));
    }
    return res;
}

function crawler(src, extractor, callback) {
    var request = require('request');
    var URL = require('url-parse');

    request(src, function(error, response, body) {
        if(error) {
            console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);
        if(response.statusCode === 200) {
            extractor(body, callback, src);
        }
    });
}

module.exports.crawler = crawler;
module.exports.map = map;
module.exports.filter = filterElements;
module.exports.children = children;