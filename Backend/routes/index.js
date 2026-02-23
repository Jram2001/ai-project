var express = require('express');
var router = express.Router();
var authRoutes = require('./auth.route');
var integrationRoutes = require('./integration.routes');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/auth', authRoutes);
router.use('/auth', authRoutes);
router.use('/integration', integrationRoutes);

module.exports = router;
