const express = require('express');
const router = express.Router();

router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));

module.exports = router;