var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, app) {
  var User = app.get('models').User;

  // SESSION SETUP
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      return done(null, user);
    }).catch(function(err) {
      return done(err);
    });
  });

  // LOCAL STRATEGY
  // signup
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done){
      process.nextTick(function() {

      User.findOne({where: {username: username}})
        .then(function(user) {
          // if findOne returns a user, the username is taken
          if (user) {
            return done(null, false);
          } else {
            // if the name isn't taken, add new user to database
            var newUser = {
              username: username,
              hashedPass: User.generateHash(password),
              isAdmin: req.body.isAdmin || false
            };
            return User.create(newUser)
              .then(function(user){
                return done(null, user);
              })
              .catch(function(err){
                throw err;
              });
          }
        })
        .catch(function(err) {
          return done(err);
        });
    });
  }));

  // login
  passport.use('local-login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {
      User.findOne({where: {username: username}})
      .then(function(user) {
        // does the user exist?
        if (!user) {
          return done(null, false);
        }

        // is the password correct?
        if (!user.validPassword(password)) {
          return done(null, false);
        }

        // user is authenticated!
        return done(null, user);
      })
      .catch(function(err) {
        return done(err);
      });
    })
  );
};