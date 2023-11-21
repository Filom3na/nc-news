const express = require('express');
const app = express();
const {getTopics, getAPI} = require('./db/topics.controller');

app.get('/api/topics', getTopics);
app.get('/api', getAPI);

app.use((err, req, res, next)=> {
    if(err.message === 'Topics not found') {
        res.status(500).send({ msg: 'Internal Server Error' })
}
})
module.exports = app;