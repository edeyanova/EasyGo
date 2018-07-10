var express = require('express');

var logout = new express.Router();

logout.use(function(req, res) {
    if (!req.userData) {
        res.redirect('/');
    }
    else {
        var crud = require('../../dbUtils/crud');
        crud.users.findOne({username: req.userData.username}, function(err, val) {
            if (!val) {
                res.redirect('/');
            }
            else {
                crud.users.update({username: req.userData.username}, 
                    {$set: {token: undefined, time: 0}},
                    function() {
                        res.redirect('/');
                    }
                );
            }
        });
    }
});

module.exports = logout;