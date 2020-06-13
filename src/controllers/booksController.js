const Book = require('../models/book')
const File = require('../models/file')

const booksController = {
    all: async (req, res) => {
        const result = await Book.all()
        res.json(result)
    },
    find: async (req, res) => {
        const book = await Book.find(req.params.id)
        const image = await File.find(book.image)
        book.image_path = image ? image.path : null
        if( !book ) {
            res.sendStatus(404)
        } else {
            res.json(book)
        }
    },
    findByIsbn: async (req, res) => {
        const book = await Book.findByIsbn(req.params.isbn)
        const image = await File.find(book.image)
        book.image_path = image ? image.path : null
        if( !book ) {
            res.sendStatus(404)
        } else {
            res.json(book)
        }
    },
    create: async (req, res, data, file) => {
        const fileId = await File.create(file)
        data.image = fileId
        const result = await Book.create(data)
        if( result.affectedRows == 1 ) {
            res.send({ status: "Created", insertId: result.insertId })
        } else {
            res.send({ status: result.error })
        }
    },
    update: async (req, res, data, file) => {
        const book = await Book.find(req.params.id)
        data.image = book.image
        if(data.delete == 'true') {
            console.log("Delete file")
            const deletion = await File.delete(book.image)
            data.image = null
        }
        if(file != undefined) {
            const deletion = await File.delete(book.image)
            const fileId = await File.create(file)
            data.image = fileId
        }
        const result = await Book.update(req.params.id, data)
        if( result.affectedRows == 1 ) {
            res.send({ status: "Updated" })
        } else {
            res.send({ status: result.error })
        }
    },
    delete: async (req, res) => {
        const book = await Book.find(req.params.id)
        const deletion = await File.delete(book.image)
        const result = await Book.delete(req.params.id)
        if( result.affectedRows == 1 ) {
            res.send({ status: "Deleted" })
        } else {
            res.send({ status: result.error })
        }
    },
}

module.exports = booksController;
