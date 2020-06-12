var mysql = require('mysql2');

const config = require('../../config')

var pool = mysql.createPool(config.database)
console.log('Pool created');
console.log(new Date().toLocaleTimeString())

pool.on('error', function(err){
    console.log("Database dead")
    console.log(new Date().toLocaleTimeString())
})

module.exports = pool
