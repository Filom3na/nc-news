const express = require('express');
const app = express();
const {getTopics} = require('./db/topics.controller');


// const apiRouter = require("./topics.router");

app.get('/api/topics', getTopics);

                      
// app.use('/api/topics', apiRouter);
module.exports = app;