const { fetchTopics, fetchEndpoints } = require('../models/topics.model');
const endpoints = require('../endpoints.json')

  exports.getTopics = (req, res, next) => {
    fetchTopics()
      .then(topics => {
        res.status(200).send({topics});  
      })
      .catch(next)
      
  }

  exports.getAPI = (req, res, next) => {
    fetchEndpoints()
      .then(endpoints => {
        res.status(200).send(endpoints)  
      })
      .catch(next);
  }