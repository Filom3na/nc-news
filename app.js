const express = require('express');
const app = express();
const {getTopics, getAPI} = require('./controllers/topics.controller');
const { getArticleById, getArticles, getArticleComments } = require('./controllers/articles.controller');
const { postComment } = require('./controllers/comments.controller');

app.use(express.json())

app.get('/api/topics', getTopics);
app.get('/api', getAPI);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id/comments', getArticleComments);
app.post('/api/articles/:article_id/comments', postComment);



app.use((err, req, res, next)=> {
    if (err.status === 404 || err.code === '23502') {  
        res.status(404).send({msg: 'Not found'})
      } else {
        next (err)
      }
})

app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad request' });
  } 
  else {res.status(500).send({ msg: 'Internal Server Error' });

}});


module.exports = app;   