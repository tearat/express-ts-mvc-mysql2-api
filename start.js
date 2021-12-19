const express = require("express")
const routes = require("./src/routes/routes")
const path = require("path")
const bodyParser = require("body-parser")
const fileParser = require("express-multipart-file-parser")

const envRealPath = path.resolve(__dirname, ".env")
require("dotenv").config({ path: envRealPath })

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
})

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(bodyParser.json())
app.use(fileParser)

app.use(routes)
app.use("/storage", express.static(__dirname + "/storage/"))

const port = process.env.PORT || 8000

app
  .listen(port, () => console.log(`>>> Server starts (port ${port})`))
  .on("error", (error) => console.warn(error))
