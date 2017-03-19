
const app = require('../../server.js')
const request = require('supertest')
const expect = require('chai').expect

describe('Company', function () {
  it('Should get all companies', function (done) {
    request(app)
      .get('/api/companies/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        if (err) {
          throw new Error(err)
        }
        expect(resp.body).to.be.an('array')
        done()
      })
  })

  it('Should create a new company', function (done) {
    request(app)
      .post('/api/companies/signup')
      .send({
        username: 'ddxd',
        email: 'fatima@hotmail.com',
        password: 'fatimahamami'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, resp) {
        console.log(resp.body)
        if (err) {
          console.log(err)
        }
        expect(resp.body).to.be.an('object')
        done()
      })
  })
  it('Should send mail', function (done){
    request(app)
      .post('/api/companies/signup')
      .send({
        username: 'dddddddd',
        email: 'fatima@hotmail.com',
        password: 'fatimahamami'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, resp) {
        // console.log(resp.body)
        if (err) {
          console.log(err)
        }
        var code = resp.body
        // console.log(resp.body.code)
        request(app)
        .get('/api/companies/checkcode/' + code.code)
        .end(function (err,resp) {
          if(err){
            throw new Error(err)
          }
        })
        expect(resp.body.code).to.equal(code.code)
        done()
      })

  })

  it('Should get one company', function (done) {
    request(app)
      .post('/api/companies/signin')
      .send({
        email: 'fatima@hotmail.com',
        password: 'fatimahamami'
      })
      .set('Accept', 'application/json')
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
      expect(resp.body.email).to.equal('fatima@hotmail.com')
      })
      done()
  })
})
