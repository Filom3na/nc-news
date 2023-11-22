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
describe('GET /api/articles/:article_id', () => {

  test('responds 200 with requested article', () => { 
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          const article = body.article;

          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String)  
          });
        });
    });

  test('responds 404 for id not found', () => {
      return request(app)
        .get('/api/articles/999')
        .expect(404)
        .then(({ body }) =>  {
          expect(body.msg).toBe('Article not found');
        });
  });
   
});