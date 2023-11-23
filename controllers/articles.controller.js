const { fetchArticleById, fetchArticles,fetchCommentsByArticleId } = require('../models/articles.model')

exports.getArticleById = (req, res, next) => {  
  fetchArticleById(req.params.article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
}

exports.getArticles = (req, res, next) => {
  fetchArticles()
    .then(articles => {
      res.status(200).send({articles});  
    })
    .catch(next);
}

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
fetchCommentsByArticleId(article_id)
    .then(comments => {
              res.status(200).send({comments});        
            })
            .catch(next);  
        }