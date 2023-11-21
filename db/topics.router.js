const apiRouter = require('express').Router();
const { getTopics } = require('../db/topics.controller');

apiRouter.get('/', (req, res) => {
    res.status(200).send('All OK from API Router');
  });
  
  module.exports = apiRouter;