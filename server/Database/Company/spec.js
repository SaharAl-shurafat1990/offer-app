const app = require('../../server.js')
const request = require('supertest')
const expect = require('chai').expect

describe('company', function () {
  it('Should get all users', function (done) {
    request(app)
      .get('/api/users/')
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

  xit('Should create a new User', function (done) {
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'dd',
        email: 'fatima@hotmail.com',
        password: 'fatimahamami'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        expect(resp.body.email).to.equal('fatima@hotmail.com')
        done()
      })
  })

  it('Should get one user', function (done) {
    request(app)
      .post('/api/users/signin')
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
