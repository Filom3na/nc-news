const express = require('express');
const app = express();
const {getTopics, getAPI} = require('./controllers/topics.controller');
const { getArticleById, getArticles, getArticleComments } = require('./controllers/articles.controller');



app.get('/api/topics', getTopics);
app.get('/api', getAPI);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id/comments', getArticleComments);



app.use((err, req, res, next)=> {
    if (err.status === 404) {  
        res.status(404).send({msg: 'Article not found'})
      } else {
        next (err)
      }
})

app.use((err, req, res, next)=> {
    if(err.message === 'Topics not found') {
        res.status(500).send({ msg: 'Internal Server Error' })
}
})

module.exports = app;   