const request = require('supertest')
const { app } = require('../index');
const db = require('../data/dbconfig');
beforeAll(async () => {
  // run the migrations and do any other setup here
  await db.migrate.latest()
})
describe('Schemes', () => {
  it('should create a new scheme if sheme_name is unique', async () => {
    const res = await request(app)
      .post('/')
      .send({ scheme_name: "John's Scheme" })
    expect(res.statusCode).toEqual(201)
  })
  it('should not create a new scheme when scheme_name is not unique', async () => {
    const res = await request(app)
      .post('/')
      .send({ scheme_name: "John's Scheme" })
    expect(res.statusCode).toEqual(500)
  })
  it('should delete scheme by id', async () => {
    const res = await request(app)
      .delete('/1')
    expect(res.statusCode).toEqual(200)
  })
  it('should throw 404 when scheme cannot be found', async () => {
    const res = await request(app)
      .delete('/1')
    expect(res.statusCode).toEqual(404)
  })
})
