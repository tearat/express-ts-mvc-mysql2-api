const Book = require('../models/book')

const booksController = {
    all: async (req, res) => {
        const result = await Book.all()
        res.json(result)
    },
    find: async (req, res) => {
        const result = await Book.find(req.params.id)
        if( !result.length ) {
            res.sendStatus(404)
        } else {
            res.json(result[0])
        }
    },
    findByIsbn: async (req, res) => {
        const result = await Book.findByIsbn(req.params.isbn)
        if( !result.length ) {
            res.sendStatus(404)
        } else {
            res.json(result[0])
        }
    },
    create: async (req, res, data) => {
        const result = await Book.create(data)
        if( result.affectedRows == 1 ) {
            res.send({ status: "Created", insertId: result.insertId })
        } else {
            res.send({ status: result.error })
        }
    },
    update: async (req, res, data) => {
        const result = await Book.update(req.params.id, data)
        if( result.affectedRows == 1 ) {
            res.send({ status: "Updated" })
        } else {
            res.send({ status: result.error })
        }
    },
    delete: async (req, res) => {
        const result = await Book.delete(req.params.id)
        if( result.affectedRows == 1 ) {
            res.send({ status: "Deleted" })
        } else {
            res.send({ status: result.error })
        }
    },
}

module.exports = booksController;
