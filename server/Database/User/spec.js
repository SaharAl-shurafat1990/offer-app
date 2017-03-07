const app = require('../../server.js')
const request = require('supertest')
const expect = require('chai').expect

describe('company', function () {
  it('Should get all users', function (done) {
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

  xit('Should create a new Company', function (done) {
    request(app)
      .post('/api/company/')
      .send({
        companyOwner: "FATIMA",
        companyName: "HAMAMI",
        phoneNumber: "078788231",
        email: "fatima@hotmail.com",
        location: "Rainbo STR",
        companyType: "coffe",
        password: "fatimahamami"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        expect(resp.body).to.be.an('object')
        done()
      })
  })

  xit('Should get one company', function (done) {
    request(app)
      .post('/api/company/')
      .send([{
        title: 'Test Book',
        auther: 'Ibrahim',
        pageNumber: '666'
      }])
      .set('Accept', 'application/json')
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        let book = resp.body
        request(app)
          .get('/api/company/' + book.title)
          .end(function (err, resp) {
            if (err) {
              throw new Error(err)
            }
            expect(resp.body.book.title).to.equal('Test Book')
            done()
          })
      })
      done()
  })
})
