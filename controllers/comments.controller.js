
const { insertComment } = require('../models/comments.model');


exports.postComment = (req, res, next) => {
  const commentsAdded = req.body
  const articleId = req.params.article_id
  insertComment(commentsAdded, articleId)
    .then(comment => {
        res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err)
    })
} 

