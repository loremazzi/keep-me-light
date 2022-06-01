const express = require('express');
const router = express.Router();

const {dialogIntent} = require("../dialogflow/index");

router.post('/*',dialogIntent);

module.exports = router;