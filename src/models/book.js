const database = require('../database/database')

const Book = {
    all: async () => {
        const sql = `select * from books;`
        const [rows, fields] = await database.promise().query(sql)
        return rows
    },
    find: async (id) => {
        let sql = `select * from books where id = ${id};`
        const [rows, fields] = await database.promise().query(sql)
        return rows
    },
    findByIsbn: async (isbn) => {
        let sql = `select * from books where isbn = ${isbn};`
        const [rows, fields] = await database.promise().query(sql)
        return rows
    },
    create: async (data) => {
        if( data.isbn && data.title && data.author ) {
            let sql = `insert into books (isbn, title, author) values ('${data.isbn}', '${data.title}', '${data.author}');`
            const [rows, fields] = await database.promise().query(sql)
            return rows
        } else {
            return { "error": "Error. Fields not send" }
        }
    },
    update: async (id, data) => {
        if( data.title && data.author ) {
            let sql = `update books set isbn = '${data.isbn}', title = '${data.title}', author = '${data.author}' where id = ${id};`
            const [rows, fields] = await database.promise().query(sql)
            return rows
        } else {
            return { "error": "Error. Fields not send" }
        }
    },
    delete: async (id, data) => {
        let sql = `delete from books where id = ${id};`
        const [rows, fields] = await database.promise().query(sql)
        return rows
    },
}

module.exports = Book
