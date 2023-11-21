const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const endpoints = require('../endpoints.json')

beforeEach(() => seed(testData))
afterAll(() => {
  db.end(); 
});


describe (' GET /api/topics', () => {
  
  
    
      test('responds with topic objects containing required properties', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({body}) => {  
            const topics = body.topics
            expect(topics.length).toBe(3)
            topics.forEach((topic) => {
              expect(topic).toMatchObject({'slug': expect.any(String), 'description': expect.any(String)})
            })
          }) 
      });

})


describe('/api', () => {
  test('GET responds with json describing all endpoints', () => {
    return request(app)
      .get('/api')
      .expect(200) 
      .then((res) => {
        expect(res.body).toEqual(endpoints);  
      });
  });
});