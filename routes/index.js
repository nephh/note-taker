const express = require('express');
const notesRouter = require('./notes.js');
const router = express();

router.use('/notes', notesRouter);

module.exports = router;