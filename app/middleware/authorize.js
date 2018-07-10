module.exports =  function(type) {
  if (type === 'user') {
    return function(req, res, next) {
      if (req.userData) {
        next();
      }
      else {
        res.redirect('/logins');
      }
    };
  }
  else if (type === 'admin') {
    return function(req, res, next) {
      if (req.userData && req.userData.role === 'admin') {
        next();
      }
      else {
        res.redirect('/logins');
      }
    };
  }
}
