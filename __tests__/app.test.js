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


describe('GET /api/articles', () => {

  test('responds with status 200', () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(res => {
      expect(res.body.articles.length).toBe(13);
    });
  });

test('articles have required properties', () => {
  return request(app)
    .get('/api/articles')
    .expect(200)
    .then(res => {
      const article = res.body.articles[0];
      expect(article).toMatchObject({
        author: expect.any(String)  
      });
    });
});

test('articles do not have body property', () => {
  return request(app)
    .get('/api/articles')
    .expect(200)
    .then(res => {
      const article = res.body.articles[0];
      expect(article).not.toHaveProperty('body');
    });
});

  test('articles sorted by created_at descending', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(res => {
        const { articles } = res.body; 
        const dates = articles.map(a => new Date(a.created_at));
        const copiedDates = [...dates];
        copiedDates.sort((a, b) => b - a);
        expect(dates).toEqual(copiedDates);
      });
  })
    

})

describe('GET /api/articles/:article_id/comments', () => {
    
  test('respond with a 200 status and array of comments', () => { 
      return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({body}) => {
           const {comments} = body;
           expect(comments).toBeInstanceOf(Array);
        });
    });
    
    test('comments have required properties', () => {
      return request(app)
        .get('/api/articles/1/comments')   
        .then(({body}) => {
          const comment = body.comments[0];  
          expect(comment).toEqual({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),  
            article_id: 1     
          })
        });
      })
        
        })
