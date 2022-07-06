const express = require('express');
const router = express.Router();

const {dialogIntent} = require("../dialogflow/indexedit");
router.get('/mattia', function (req, res) {
    res.send("ciao mattia")
  });
  
router.post('/*',dialogIntent);
module.exports = router;