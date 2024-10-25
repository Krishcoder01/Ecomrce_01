const express = require('express');
const router = express.Router();

const {isLoggedIn} = require('../middlewares/auth')

module.exports = router;