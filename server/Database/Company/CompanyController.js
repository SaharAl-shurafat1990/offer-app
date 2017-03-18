var Q = require('q')
var jwt = require('jwt-simple')
var Company = require('./CompanyModel.js')
var nodemailer = require('nodemailer');


// Promisify a few mongoose methods with the `q` promise library
var findCompany = Q.nbind(Company.findOne, Company)
var createCompany = Q.nbind(Company.create, Company)

module.exports = {
  deleteD : function(req,res){
    Company.findOne({email:req.params.email})
    .then(function(company){
      if(company){
        Company.deleteOne({email:email})
      }
    })
  },
  getAll: function(req,res){
    Company.find().exec(function (err,allCompanies) {
      if (err) {
        res.status(500).send(err)
      }else{
        res.json(allCompanies)
      }
    })
  },
  signin: function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    findCompany({email: email})
      .then(function (company) {
        if (!company) {
          next(new Error('Company does not exist'))
        } else {
          return company.comparePasswords(password)
            .then(function (foundCompany) {
              if (foundCompany) {
                var token = jwt.encode(company, 'secret')
                console.log(company._id)
                res.json({token: token,company:company.email})
              } else {
                return next(new Error('No company'))
              }
            })
        }
      })
      .fail(function (error) {
        next(error)
      })
  },

  signup: function (req, res, next) {

    // console.log(req.body)
    var companyOwner = req.body.companyOwner;
    var companyName = req.body.companyName;
    var phoneNumber = req.body.phoneNumber;
    var active = ture;
    var email = req.body.email;
    var location = req.body.location;
    //var companyType = req.body.companyType;
    var description = req.body.description;
    var password = req.body.password;
    // check to see if user already exists
    findCompany({companyName: companyName})
      .then(function (company) {
        if (company) {
          next(new Error('Company already exist!'))
        } else {
          // make a new user if not one
          return createCompany({
            companyOwner: companyOwner,
            companyName: companyName,
            phoneNumber: phoneNumber,
            active: active,
            email: email,
            location: location,
           // companyType: companyType,
            description: description,
            password: password
          })
        }
      })
      .then(function (company) {
        console.log(company)
        // create token to send back for auth
        var token = jwt.encode(company, 'secret')
        res.status(201).json({token: token,email: email})
      })
      .fail(function (error) {
        console.log(error)
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
      var company = jwt.decode(token, 'secret')
      console.log(token)
      findCompany({companyName: company.companyName})
        .then(function (foundCompany) {
          if (foundCompany) {
            res.send(200)
          } else {
            res.send(401)
          }
        })
        .fail(function (error) {
          next(error)
        })
    }
  },
  sendemail: function(req, res) {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'offerapp1@gmail.com',
        pass: 'msmRBK!@12'
      }
    });
    var mailOptions = {
      from: 'offerapp1@gmail.com',
      to: req.body.email,
      subject: 'From ' + req.body.name,
      text: req.body.msg

    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        res.json({Message: 'opss, some thing went wrong please try later'});
      } else {
        res.json({Message: 'your e-mail has been sent successfully'});
      }
    });
  },
  deactive: function(req, res) {
    TradeWorker.findById(req.user._id, function(err, company) {
      if (err) {
        res.status(500).send({error: 'faild to find company!'});
      } else {
        TradeWorker.update(company, {active: false}, function(err, newcompany) {
          if (err) {
            res.status(500).send({error: 'somthing went wrong, please try again'});
          } else {
            res.status(201).send(newcompany);
          }
        });
      }
    });
  }
}
