const database = require('../database/database')
const fs = require('fs')

const File = {
    all: async () => {
        const sql = `select * from files;`
        const [rows, fields] = await database.promise().query(sql)
        return rows
    },
    find: async (id) => {
        let sql = `select * from files where id = ${id};`
        const [rows, fields] = await database.promise().query(sql)
        return rows[0]
    },
    create: async (file) => {
        if( file && (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') ) {
            let path = __dirname + '/../../storage/' + file.originalname
            fs.writeFile(path, file.buffer, (err) => {
                if (err) throw err
            })
            let sql = `insert into files (path) values ('${file.originalname}');`
            const [rows, fields] = await database.promise().query(sql)
            return rows.insertId
        } else {
            return null
        }
    },
    delete: async (id) => {
        let sql = `delete from files where id = ${id};`
        const [rows, fields] = await database.promise().query(sql)
        return rows
    },
}

module.exports = File
