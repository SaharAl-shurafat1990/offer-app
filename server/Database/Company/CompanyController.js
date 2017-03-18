var Q = require('q')
var jwt = require('jwt-simple')
var Company = require('./CompanyModel.js')

module.exports.handleUsers = {
  signin : function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    Company.findOne({username: username})
      .then(function (user) {
       
     console.log(user)
        if (!user) {

          res.status(404).json("user not found")
        } else {
          user.comparePasswords(password)
            .then(function (isMatch) {
              if (isMatch) {
                var token = jwt.encode(user, 'secret');
                res.json({token : token, user : user});

              } else {
                res.json("password not matched")
              }
            });
        }
      });
  },

  // add user to data base
  signup: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // check to see if user already exists
    Company.findOne({username: username})
      .exec(function (err, user) {
        if (user) {
          res.json('User already exist!');
        } else {
          // make a new user if not one
          return Company.create({
            username: username,
            password: password
          }, function (err, newUser) {
              // create token to send back for auth
              if(err){
                res.json(err);
              } else {
                var token = jwt.encode(user, 'secret');
                res.json({token: token}); 
              }     
          });
        }
      });
  },

  // get user in data base
  getUsers: function(req, res) {
    Company.find({}, function(err, users){
      if(err){
        res.json(err);
      } else {
        res.json(users);
      }
    });
  }

}