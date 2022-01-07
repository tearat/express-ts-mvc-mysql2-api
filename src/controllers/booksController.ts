import Book from "../models/book"
import File from "../models/file"

export const booksController = {
  all: async (req, res) => res.json(await Book.all()),
  find: async (req, res) => {
    const result = await Book.find(req.params.id)
    return result.length ? res.json(result[0]) : res.sendStatus(404)
  },
  findByIsbn: async (req, res) => {
    const result = await Book.findByIsbn(req.params.isbn)
    return result.length ? res.json(result[0]) : res.sendStatus(404)
  },
  create: async (req, res) => {
    const file = req.files[0]
    const uploadResult = file ? await File.create(file) : null
    const image = uploadResult ? uploadResult.insertId : null
    const data = { ...req.body, image }
    const result = await Book.create(data)
    return result.affectedRows
      ? res.json({ status: "Created", insertId: result.insertId })
      : res.sendStatus(404)
  },
  // TODO
  // update: async (req, res, data, file) => {
  //   const book = await Book.find(req.params.id)
  //   data.image = book.image
  //   if (data.delete == "true") {
  //     console.log("Delete file")
  //     const deletion = await File.delete(book.image)
  //     data.image = null
  //   }
  //   if (file != undefined) {
  //     const deletion = await File.delete(book.image)
  //     const fileId = await File.create(file)
  //     data.image = fileId
  //   }
  //   const result = await Book.update(req.params.id, data)
  //   if (result.affectedRows == 1) {
  //     res.send({ status: "Updated" })
  //   } else {
  //     res.send({ status: result.error })
  //   }
  // },
  // TODO
  // delete: async (req, res) => {
  //   const book = await Book.find(req.params.id)
  //   const deletion = await File.delete(book.image)
  //   const result = await Book.delete(req.params.id)
  //   if (result.affectedRows == 1) {
  //     res.send({ status: "Deleted" })
  //   } else {
  //     res.send({ status: result.error })
  //   }
  // },
}

// module.exports = booksController
