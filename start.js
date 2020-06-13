const express = require('express')
const routes = require('./src/routes/routes')
const config = require('./config')
const bodyParser = require('body-parser')

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next();
});

app.use(routes)
app.use('/storage', express.static(__dirname + "/storage/"));

app.listen(config.server.port, () => console.log(`>>> Server starts (port ${config.server.port})`))
    .on('error', error => console.warn(error))
