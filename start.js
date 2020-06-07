const express = require('express')
const routes = require('./src/routes/routes')
const config = require('./config')

const app = express()
app.use(routes)

app.listen(config.server.port, () => console.log(`>>> Server starts (port ${config.server.port})`))
    .on('error', error => console.warn(error))
