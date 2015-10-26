module.exports = function(req, res, next){
  console.log(req.user);
  if (!req.user) {
    res.status(401).json({
      status: 401,
      message: 'error',
      type: 'not logged in'
    });
  } else {
  
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({
        status: 401,
        message: 'error',
        type: 'not an admin'
      });
    }
  }
};