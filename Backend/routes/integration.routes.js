const express = require('express');
const router = express.Router();
const { ingestApi } = require('../controller/integration.controller');

router.post('/ingest', ingestApi);

module.exports = router;