const db = require('../db/connection')
const jsonfile = require('jsonfile')

exports.fetchTopics = () => {
    return db.query(` SELECT * FROM topics`)
    .then(({rows}) => {
        return rows;
    })
}

exports.fetchEndpoints = () => {
    return Promise.resolve(jsonfile.readFile('./endpoints.json'));
  };
  