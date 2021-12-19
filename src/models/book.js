const database = require("../database/database")

const Book = {
  all: async () =>
    database
      .promise()
      .query(`select * from books;`)
      .then((res) => res[0]),
  find: async (id) =>
    database
      .promise()
      .query(
        `select b.id, b.isbn, b.title, b.author, f.path from books b left join files f on f.id = b.image where b.id = ?`,
        [id]
      )
      .then((res) => res[0]),
  findByIsbn: async (isbn) =>
    database
      .promise()
      .query(
        `select b.id, b.isbn, b.title, b.author, f.path from books b left join files f on f.id = b.image where b.isbn = ?`,
        [isbn]
      )
      .then((res) => res[0]),
  create: async (data) => {
    if (data.isbn && data.title && data.author) {
      let image = data.image ? `'${data.image}'` : "NULL"
      let sql = `insert into books (isbn, title, author, image) values ('${data.isbn}', '${data.title}', '${data.author}', ${image});`
      const [rows, fields] = await database.promise().query(sql)
      return rows
    } else {
      return {
        error: "Create error. Fields not send",
      }
    }
  },
  update: async (id, data) => {
    if (data.isbn && data.title && data.author) {
      let image = data.image ? `'${data.image}'` : "NULL"
      let sql = `update books set isbn = '${data.isbn}', title = '${data.title}', author = '${data.author}', image = '${data.image}' where id = ${id};`
      const [rows, fields] = await database.promise().query(sql)
      return rows
    } else {
      return {
        error: "Update error. Fields not send",
      }
    }
  },
  delete: async (id, data) => {
    let sql = `delete from books where id = ${id};`
    const [rows, fields] = await database.promise().query(sql)
    return rows
  },
}

module.exports = Book
