const router = require("express").Router();
const { User, Category, Product, Tag } = require("../models");
const withAuth = require("../utils/auth.js");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Category.findAll(req.body);
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
