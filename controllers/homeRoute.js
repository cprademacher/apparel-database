const router = require('express').Router();
const { User, Category, Product, Tag } = require('../models');
const withAuth = require('../utils/auth.js');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/mkdir');
      return;
    }
  
    res.render('login');
  });

module.exports = router;