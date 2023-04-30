// import required modules
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());

// custom return result
function customResult(req, res, next) {
    res.result = function(status, data, message, statusName) {
      res.send({ status: status, data: data, message: message, statusName: statusName });
    }
    
    next();
}

router.use(customResult);

module.exports = router;