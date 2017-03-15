const app = require('../../server.js')
const request = require('supertest')
const expect = require('chai').expect
var today = new Date()
var dd = today.getDate()
var mm = today.getMonth()+1
var yyyy = today.getFullYear()
if(dd < 10){
  dd = "0"+dd
}
if(mm<10){
  mm="0"+mm
}
describe('offers', function () {
  it('Should get all offers', function (done) {
    request(app)
      .get('/api/offers/')
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

  it('Should create a new offer', function (done) {
    request(app)
      .post('/api/offers/addoffer')
      .send({
        description: 'we are the best',
        location: 'Irbid Jordan',
        date: mm+'/'+dd+'/'+yyyy
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

  it('Should get one offer', function (done) {
    request(app)
      .post('/api/getoffer')
      .send({
        description: 'it is all about food',
        location: 'abdon',
        date: mm+'/'+dd+'/'+yyyy
      })
      .set('Accept', 'application/json')
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        let offer = resp.body
        request(app)
          .get('/api/movie/' + offer.name)
          .end(function (err, resp) {
            if (err) {
              throw new Error(err)
            }
            expect(resp.body.movie.name).to.equal('Test movie')
            done()
          })
      })
      done()
  })
})
