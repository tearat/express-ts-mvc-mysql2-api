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
        return rows[0]
    },
    findByIsbn: async (isbn) => {
        let sql = `select * from books where isbn = ${isbn};`
        const [rows, fields] = await database.promise().query(sql)
        return rows[0]
    },
    create: async (data) => {
        if( data.isbn && data.title && data.author ) {
            let image = data.image ? `'${data.image}'` : 'NULL'
            let sql = `insert into books (isbn, title, author, image) values ('${data.isbn}', '${data.title}', '${data.author}', ${image});`
            const [rows, fields] = await database.promise().query(sql)
            return rows
        } else {
            return { "error": "Create error. Fields not send" }
        }
    },
    update: async (id, data) => {
        if( data.isbn && data.title && data.author ) {
            let image = data.image ? `'${data.image}'` : 'NULL'
            let sql = `update books set isbn = '${data.isbn}', title = '${data.title}', author = '${data.author}', image = '${data.image}' where id = ${id};`
            const [rows, fields] = await database.promise().query(sql)
            return rows
        } else {
            return { "error": "Update error. Fields not send" }
        }
    },
    delete: async (id, data) => {
        let sql = `delete from books where id = ${id};`
        const [rows, fields] = await database.promise().query(sql)
        return rows
    },
}

module.exports = Book
