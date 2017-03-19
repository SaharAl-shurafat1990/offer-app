var Q = require('q')
var jwt = require('jwt-simple')
var Company = require('./CompanyModel.js')
var nodemailer = require('nodemailer');

module.exports.handleUsers = {
  signin : function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    Company.findOne({username: username})
      .then(function (user) {

    //  console.log(user)
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
    var randomNumber = function(){
      return Math.floor(Math.random() * 100000)
    }
    var codeNumber = randomNumber()
    var username = req.body.username;
    var email = req.body.email
    var password = req.body.password;
    var code =  codeNumber;
    // console.log(req.body)
    // check to see if user already exists
    Company.findOne({username: username})
      .exec(function (err, user) {
        if (user) {
          res.json('User already exist!');
        } else {
          // make a new user if not

          return Company.create({
            username: username,
            email: email,
            password: password,
            code: code
          }, function (err, newUser) {
              // create token to send back for auth
              if(err){
                res.json(err);
              } else {
                var token = jwt.encode(user, 'secret');
                res.status(201).json({token: token, code:code});
              }
          });
        }
      })
      var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'offerapp1@gmail.com',
            pass: 'msmRBK!@12'
          }
        });
        // $window.localStorage.code = code;
        var mailOptions = {
          from: 'offerapp1@gmail.com',
          to: req.body.email,
          subject: 'From' + ' ' + req.body.username,
          text: 'Welcome to Our company, now you can post any offer that you have in your Company, and Your code is ' + code + '.!'

        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            res.status(404).json({Message: 'opss, some thing went wrong please try later'});
          } else {
            res.status(201).json({Message: 'your e-mail has been sent successfully'});
          }
        });
  },
  checkcode : function(req,res){
    var code = req.params.code;
    // console.log(req.params, " params")
    Company.findOne({code:code})
      .then(function (code) {
        // console.log(code)
    //  console.log(code)
        if (!code) {

          res.status(404).json("code not found")
        } else {
        res.json({code : code});
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
