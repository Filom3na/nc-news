const express = require('express');
const app = express();
const {getTopics} = require('./db/topics.controller');


app.get('/api/topics', getTopics);


app.use((err, req, res, next)=> {
    if(err.message === 'Topics not found') {
        res.status(500).send({ msg: 'Internal Server Error' })
}
})
module.exports = app;