var express = require('express');
var router = express.Router();
var { signIn, signUp } = require('../services/auth.service')

router.post('/signin', signIn);
router.post('/signUp', signUp);

module.exports = router;
