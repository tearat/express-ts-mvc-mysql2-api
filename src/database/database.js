var mysql = require("mysql2")
const path = require("path")

const envRealPath = path.resolve(__dirname, "../../.env")
require("dotenv").config({ path: envRealPath })

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})
console.log("Pool created")
console.log(new Date().toLocaleTimeString())

pool.on("error", function (err) {
  console.log("Database dead")
  console.log(new Date().toLocaleTimeString())
})

module.exports = pool
