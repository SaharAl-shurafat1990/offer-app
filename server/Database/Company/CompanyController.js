var Q = require('q');
var jwt = require('jwt-simple');
var Company = require('./CompanyModel.js');


// Promisify a few mongoose methods with the `q` promise library
var findCompany = Q.nbind(Company.findOne, Company);
var createCompany = Q.nbind(Company.create, Company);

module.exports = {
  getAll: function(req,res){
    Company.find().exec(function (err,allCompanies) {
      if (err) {
        res.status(500).send(err);
      }else{
        res.json(allCompanies)
      }
    })
  },
  signin: function (req, res, next) {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;

    findCompany({email: email})
      .then(function (company) {
        if (!company) {
          next(new Error('Company does not exist'));
        } else {
          return company.comparePasswords(password)
            .then(function (foundCompany) {
              if (foundCompany) {
                var token = jwt.encode(company, 'secret');
                console.log(company._id)
                res.json({token: token,company:company.email});
              } else {
                return next(new Error('No company'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    console.log(req.body)
    var companyOwner = req.body.companyOwner;
    var companyName = req.body.companyName;
    var phoneNumber = req.body.phoneNumber;
    var email = req.body.email;
    var location = req.body.location;
    var companyType = req.body.companyType;
    var description = req.body.description;
    var password = req.body.password;
    //var salt = req.body.salt;
    // console.log(req.body)
    // check to see if user already exists
    findCompany({companyName: companyName})
      .then(function (company) {
        if (company) {
          next(new Error('Company already exist!'));
        } else {
          // make a new user if not one
          return createCompany({
            companyOwner: companyOwner,
            companyName: companyName,
            phoneNumber: phoneNumber,
            email: email,
            location: location,
            companyType: companyType,
            description: description,
            password: password
          });
        }
      })
      .then(function (company) {
        // create token to send back for auth
        var token = jwt.encode(company, 'secret');
        res.json({token: token,email: email});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var company = jwt.decode(token, 'secret');
      console.log(token)
      findCompany({companyName: company.companyName})
        .then(function (foundCompany) {
          if (foundCompany) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};
