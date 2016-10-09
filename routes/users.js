var express = require('express');
var router = express.Router();
var jsonFile = require('../public/json/accountType.json');

/* GET users listing. */
router.get('/json', function(req, res, next) {
  res.send(jsonFile);
});

module.exports = router;
