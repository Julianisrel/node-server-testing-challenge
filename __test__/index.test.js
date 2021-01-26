const request = require("supertest")
const server = require("../index")

describe('POST /', function() {
  it('responds with json', function(done) {
    request(server)
      .post('/')
      .send({scheme_name: 'john'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
