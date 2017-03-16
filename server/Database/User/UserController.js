var Q = require('q')
var jwt = require('jwt-simple')
var User = require('./UserModel.js')

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "1176911719073137",
    clientSecret: "188d1864fd1171cd8b6b5b12e4489907",
    callbackURL: "http://localhost/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("we are here")
    done(null,profile)
  }
));



// Promisify a few mongoose methods with the `q` promise library
var findUser = Q.nbind(User.findOne, User)
var createUser = Q.nbind(User.create, User)

module.exports = {
  getAll: function(req,res){
    User.find().exec(function (err,allUsers) {
      if (err) {
        res.status(500).send(err)
      }else{
        res.json(allUsers)
      }
    })
  },
  signin: function (req, res, next) {
    var username = req.body.username
    var password = req.body.password

    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'))
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret')
                console.log(user._id)
                res.json({token: token,user:user})
              } else {
                return next(new Error('No user'))
              }
            })
        }
      })
      .fail(function (error) {
        next(error)
      })
  },

  signup: function (req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    //  console.log(req.body)
    // check to see if user already exists
    findUser({username: username})
      .then(function (user) {
        if (user) {
          next(new Error('User already exist!'))
        } else {
          // make a new user if not one
          return createUser({
            username: username,
            email:email,
            password: password

          })
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret')
        res.status(201).json({token: token})
      })
      .fail(function (error) {
        next(error)
      })
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token']
    if (!token) {
      next(new Error('No token'))
    } else {
      var user = jwt.decode(token, 'secret')
      console.log(token)
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200)
          } else {
            res.send(401)
          }
        })
        .fail(function (error) {
          next(error)
        })
    }
  }
}
