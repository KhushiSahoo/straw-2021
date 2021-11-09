
const express = require('express');
const router = express.Router();

/**
 * Home page
 * 
 */
router.get('/Donate', function(req, res, next) {
	res.render('donate/index');
});

module.exports = router;