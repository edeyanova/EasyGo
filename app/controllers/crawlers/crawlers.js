var express = require('express');

var crawlers = new express.Router();

crawlers.use(require('../../middleware/authorize')("admin"));

crawlers.get('/all', function(req, res) {
  var db = require('../../dbUtils/crud');
  db.scripts.findAll({}, function(scripts) {
    res.render('crawlers/all', {scripts: scripts});
  });
});

crawlers.get('/edit/:id', function(req, res) {
  var id = require('mongodb').ObjectId(req.params.id);
  var db = require('../../dbUtils/crud');
  db.scripts.findOne({_id: id}, function(err, script) {
    db.trips.findAll({script: id}, function(urls) {
      for (var i = 0; i < urls.length; i++) {
        urls[i] = urls[i].url;
      }
      res.render('crawlers/edit', {urls: urls, id: id, code: script.code});
    });
  });
});

crawlers.post('/edit/:id', function(req, res) {
  var id = require('mongodb').ObjectId(req.params.id);
  var db = require('../../dbUtils/crud');
  db.scripts.update({_id: id}, {$set: {images_code: req.body.code}}, function() {
    res.redirect('/crawlers/all');
  });
});

crawlers.post('/reg', function(req, res) {
    console.log(req.body);

    var post = require('easy-post-request');

    post('https://damp-hamlet-71549.herokuapp.com/crawler/register',
        req.body).then(function(body) {
            res.redirect('/crawlers');
        })
        .catch(function (err) {
            console.error(err);
        });

});

crawlers.get('/', function(req, res) {
    if (req.userData && req.userData.role === 'user') {
        res.end('Ordinary User page');
    }
    else if (req.userData && req.userData.role === 'admin') {
        res.render('crawlers/crawlers');

    }
    else {
        res.redirect('/logins');
    }
});

crawlers.post('/', function(req, res) {
    if (req.userData && req.userData.role === 'admin') {
        var post = require('easy-post-request');

           post('https://damp-hamlet-71549.herokuapp.com/crawler/test',
               req.body).then(function(body) {
                   res.send(body);
               })
               .catch(function (err) {
                   console.error(err);
               });
    }
    else {
        res.redirect('/logins');
    }
});


module.exports = crawlers;
