const express = require('express')
const router = express.Router()
const booksController = require('../controllers/booksController')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json())

router.get('/api', (req, res) => res.send({ status: "API ready" }) )

router.get('/api/books', async (req, res) => booksController.all(req, res) )
router.get('/api/books/:id', async (req, res) => booksController.find(req, res) )
router.get('/api/books/isbn/:isbn', async (req, res) => booksController.findByIsbn(req, res) )
router.post('/api/books', async (req, res) => booksController.create(req, res, req.body) )
router.put('/api/books/:id', async (req, res) => booksController.update(req, res, req.body) )
router.delete('/api/books/:id', async (req, res) => booksController.delete(req, res) )

module.exports = router;
