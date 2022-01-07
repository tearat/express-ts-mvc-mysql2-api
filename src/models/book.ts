import database from "../database/database"

const Book = {
  all: async () =>
    await database
      .promise()
      .query(
        `select b.id, b.title, b.isbn, b.author, f.path from books b left join files f on f.id = b.image order by b.id;`
      )
      .then((res) => res[0]),
  find: async (id) =>
    await database
      .promise()
      .query(
        `select b.id, b.isbn, b.title, b.author, f.path from books b left join files f on f.id = b.image where b.id = ?`,
        [id]
      )
      .then((res) => res[0]),
  findByIsbn: async (isbn) =>
    await database
      .promise()
      .query(
        `select b.id, b.isbn, b.title, b.author, f.path from books b left join files f on f.id = b.image where b.isbn = ?`,
        [isbn]
      )
      .then((res) => res[0]),
  create: async (data) => {
    const {
      isbn = "0",
      title = "Unnamed",
      author = "Unknown",
      image = null,
    } = data
    return await database
      .promise()
      .query(
        `insert into books (isbn, title, author, image) values (?, ?, ?, ?);`,
        [isbn, title, author, image]
      )
      .then((res) => res[0])
  },
  // TODO
  // update: async (id, data) => {
  //   if (data.isbn && data.title && data.author) {
  //     let image = data.image ? `'${data.image}'` : "NULL"
  //     let sql = `update books set isbn = '${data.isbn}', title = '${data.title}', author = '${data.author}', image = '${data.image}' where id = ${id};`
  //     const [rows, fields] = await database.promise().query(sql)
  //     return rows
  //   } else {
  //     return {
  //       error: "Update error. Fields not send",
  //     }
  //   }
  // },
  // TODO
  // delete: async (id) => {
  //   let sql = `delete from books where id = ${id};`
  //   const [rows, fields] = await database.promise().query(sql)
  //   return rows
  // },
}

export default Book
