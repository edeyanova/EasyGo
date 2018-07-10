var express = require('express');

var feedback = new express.Router();
feedback.use(require('../../middleware/authorize')('user'));

feedback.get('/', function(req, res) {
    if(req.userData.role==='user'){
        res.render("feedback/comments");
    }
    else if(req.userData.role==='admin'){
        var db = require("../../dbUtils/crud");
        db.users.findAll({comment:{$exists:true}}, function(users){
            res.render("feedback/feedback", {users:users});
        });
    }
}
);

feedback.post('/', function(req, res){
    var db = require("../../dbUtils/crud");
    db.users.update({username:req.userData.username}, {$set:{comment:req.body.comment}}, function(){
        res.redirect('/');
    });
}
);

module.exports = feedback;
