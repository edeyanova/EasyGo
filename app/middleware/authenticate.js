module.exports = function(req, res, next){
    var crud = require("../dbUtils/crud");
    if(!(req.cookies.username && req.cookies.token)){
        req.userData = undefined;
        next();
        return;
    }
    crud.users.findOne({username: req.cookies.username}, function(err, val){
        if(val && val.token === req.cookies.token && val.time > (new Date).getTime()) { 
            crud.users.update({username: req.cookies.username}, 
                {$set: {time: (new Date).getTime() + 600000}}, 
                function() {
                    req.userData = val;
                    next();
                });
        }
        else {
            req.userData = undefined;
            next();
        }
    });
}