const { fetchArticleById, fetchArticles,fetchCommentsByArticleId } = require('../models/articles.model');
const { checkExists } = require('../utils');

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
  const articlePromises = [fetchCommentsByArticleId(article_id)];
  articlePromises.push(checkExists("articles", "article_id", article_id))
  Promise.all(articlePromises)
  .then((resolvedPromises) => {
    const comments = resolvedPromises[0];
    res.status(200).send({comments})
  }) .catch(next);  
}


