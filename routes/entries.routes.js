const express = require('express');

// Rutas de productos
const entriesController = require("../controllers/entries.controller");
const router = express.Router();

router.get('/', entriesController.getEntries);
router.put('/', entriesController.editEntry);
router.delete('/', entriesController.deleteEntry);



module.exports = router;