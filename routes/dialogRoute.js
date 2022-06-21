const express = require('express');
const router = express.Router();

const {dialogIntent} = require("../dialogflow/indexedit");

router.post('/*',dialogIntent);

module.exports = router;