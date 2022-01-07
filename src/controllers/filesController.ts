import File from "../models/file"
import fs from "fs"

const filesController = {
  create: async (req, res, data) => {
    if (req.files && req.files.length > 0) {
      let path = __dirname + "/../../storage/" + req.files[0].originalname
      fs.readFileSync(path, req.files[0].buffer)
      data.image = path
    }
    const result = await File.create(data)
    if (result.affectedRows == 1) {
      res.send({ status: "Created", insertId: result.insertId })
    } else {
      res.send({ status: result.error })
    }
  },
  delete: async (req, res) => {
    const result = await File.delete(req.params.id)
    if (result.affectedRows == 1) {
      res.send({ status: "Deleted" })
    } else {
      res.send({ status: result.error })
    }
  },
}

module.exports = filesController
