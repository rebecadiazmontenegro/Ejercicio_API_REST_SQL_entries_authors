const express = require('express');

const authorsController = require("../controllers/authors.controller");
const router = express.Router();

router.get('/',authorsController.getAuthors);
router.post('/',authorsController.createAuthor);
router.put('/',authorsController.editAuthor);
router.delete('/',authorsController.deleteAuthor);

module.exports = router;