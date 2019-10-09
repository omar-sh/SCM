const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./api');
var cors = require('cors');

const app = express();
app.use(helmet());
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-control-Allow-Methods', 'GET,PUT,DELETE,POST');
    res.header('Access-control-Allow-Headers', 'Content-Type,mobile,Authorization');
    next();
});


app.use('/api' , router);

app.use(async (err, req, res, next) => {
    let ex = err;
    console.log(err);
    res.statusCode = ex.statusCode || 500;
    res.send({
        code: ex.code,
        message: ex.message
    })
});

module.exports = app;