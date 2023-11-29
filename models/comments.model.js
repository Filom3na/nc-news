const db = require('../db/connection')

exports.insertComment = (commentsAdded, articleId) => {
    const { author, body } = commentsAdded
    return db.query(`
      INSERT INTO comments (body, article_id, author)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, 
    [body, articleId, author])
    .then(result => result.rows[0])
  }
