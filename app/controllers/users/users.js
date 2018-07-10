var express = require('express');

var users = new express.Router();

users.get("/tags", function(req, res) {
    if (req.userData) {
        var db = require('../../dbUtils/crud');
        db.users.findOne({username: req.userData.username}, function(err, user) {
            res.send(JSON.stringify(user.tags));
        });
    }
    else {
        res.redirect('/logins');
    }
});

users.post("/tags/:tag", function(req, res) {
    if (req.userData) {
        var db = require('../../dbUtils/crud');
        db.users.findOne({username: req.userData.username}, function(err, user) {
            var toSave = user.tags;
            if (!toSave) {
                toSave = [];
            }
            if (!toSave.includes(req.params.tag)) {
                toSave.push(req.params.tag);
                db.users.update({username: req.userData.username}, {$set: {tags: toSave}}, function() {
                    res.end();
                });
            }
            else {
                res.end();
            }
        });
    }
    else {
        res.send('authorization error');
    }
});

users.get("/", function(req, res) {
    res.render("users/users", {info: ''});
});

users.post("/", function(req, res) {
    var crud = require("../../dbUtils/crud.js");
    crud.users.findOne({username: req.body.username}, function(err, val) {
        if (val) {
            res.render('users/users', {info: "Username taken! Please choose another one!"});
        }
        else {
            console.log(req.body);
            var sha = require('sha256');
            var tmp = {
                username: req.body.username,
                first_name: req.body.first_name,
                surname: req.body.surname,
                password: sha(req.body.password),
                role: 'user'
            };
            crud.users.insert(tmp, function(err, val){
                res.redirect("/logins");
            });
        }
    });
});

module.exports = users;