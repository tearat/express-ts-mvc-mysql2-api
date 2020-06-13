const File = require('../models/file')

const booksController = {
    all: async (req, res) => {
        const result = await File.all()
        res.json(result)
    },
    find: async (req, res) => {
        const result = await File.find(req.params.id)
        if( !result.length ) {
            res.sendStatus(404)
        } else {
            res.json(result[0])
        }
    },
    create: async (req, res, data) => {
        if( req.files && req.files.length > 0 ) {
            let path = __dirname + '/../../storage/' + req.files[0].originalname
            fs.writeFile(path, req.files[0].buffer)
            data.image = path
        }
        const result = await File.create(data)
        if( result.affectedRows == 1 ) {
            res.send({ status: "Created", insertId: result.insertId })
        } else {
            res.send({ status: result.error })
        }
    },
    delete: async (req, res) => {
        const result = await File.delete(req.params.id)
        if( result.affectedRows == 1 ) {
            res.send({ status: "Deleted" })
        } else {
            res.send({ status: result.error })
        }
    },
}

module.exports = booksController;
