const app = require('../../server.js')
const request = require('supertest')
const expect = require('chai').expect

describe('user', function () {
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

  it('Should create a new User', function (done) {
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'dddddsf',
        email: 'fatimdma@hotmaill.com',
        password: 'fatimahamami'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        // console.log(resp.body)
        expect(resp.body).to.be.an('object')
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
