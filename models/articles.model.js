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
  // articles.model.js

exports.fetchArticles = () => {
  return db.query(`
    SELECT 
      articles.*, 
      CAST(COUNT(comments.article_id) AS INT) AS comment_count
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
  `).then(result => result.rows); 
}