const db = require('../db/connection')

exports.fetchArticleById = (id) => {
    return db.query(
      `SELECT articles.* FROM articles 
      WHERE articles.article_id = $1`, 
      [id]
    )
    .then(({ rows }) => {
      if(!rows.length) return Promise.reject({ status: 404 });  
      return rows[0];
    })
  }

exports.fetchArticles = () => {
  return db.query(`
  SELECT 
  articles.author,
  articles.title,
  articles.article_id,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,  
  COUNT(comments.article_id) AS comment_count
FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id  
GROUP BY articles.article_id
ORDER BY articles.created_at DESC;
`)
.then(({ rows }) => { 
return rows;
}) 
}

exports.fetchCommentsByArticleId = (articleId) => {
  return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1 
    ORDER BY created_at DESC;
  `, [articleId])
  .then(result => result.rows)
}

