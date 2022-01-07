import database from "../database/database"
import fs from "fs"

const mimeTypes = ["image/jpeg", "image/png"]

const File = {
  create: async (file) => {
    if (!file || !mimeTypes.includes(file.mimetype)) return null
    const now = new Date().getTime()
    const uniqueFilename = `${now}_${file.originalname}`
    const path = `${__dirname}/../../storage/${uniqueFilename}`
    fs.writeFile(path, file.buffer, (err) => {
      if (err) throw err
    })
    return database
      .promise()
      .query(`insert into files (path) values (?);`, [uniqueFilename])
      .then((res) => res[0])
  },
  // TODO
  // delete: async (id) => {
  //   let sql = `delete from files where id = ${id};`
  //   const [rows, fields] = await database.promise().query(sql)
  //   return rows
  // },
}

export default File
