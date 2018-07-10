var express = require('express');

var logins = new express.Router();

logins.get("/", function(req, res) {
    res.render("logins/logins", {info: ""});
});

logins.post("/", function(req, res) {
    var crud = require("../../dbUtils/crud.js");
    crud.users.findOne({username: req.body.username}, function(err, val) {
        if(val) {
            var sha = require("sha256");
            var hashedPassword = sha(req.body.password);
            if(hashedPassword === val.password) {
                var randomstring = require("randomstring");
                var t = randomstring.generate(50);
                crud.users.update({username: req.body.username}, {$set: {
                        token: t,
                        time: (new Date).getTime() + 600000
                    }}, function() {
                    res.cookie('username', req.body.username);
                    res.cookie('token', t);
                    if (val.role === 'admin') {
                        res.redirect('/statistics');
                    }
                    else if (val.role === 'user') {
                        res.redirect('/');
                    }
                    return;
                });
                return;
            }
        }
        res.render('logins/logins', {info: "Unsucessful login! Please try again!"});
    });
});

module.exports = logins;