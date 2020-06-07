var mysql = require('mysql2');

const config = require('../../config')

var connection = mysql.createConnection(config.database)

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to DB');
        return;
    }
    console.log('Connection established');
});

module.exports = connection
