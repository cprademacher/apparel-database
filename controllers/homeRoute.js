const router = require("express").Router();
const { User, Category, Product, Tag } = require("../models");
const withAuth = require("../utils/auth.js");

router.get("/", withAuth, async (req, res) => {
  const isProduct = true;

  try {
    const categoryData = await Category.findAll(req.body);
    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );
    console.log(categories, isProduct);
    res.render("homepage", {
      categories,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/collections", withAuth, async (req, res) => {
  const isCollections = true;
  try {
    const collectionsData = await Tag.findAll({
      include: [{ model: Product }
      ],
    });
    const collections = collectionsData.map((collections) => collections.get({ plain: true }));
    console.log(collectionsData, collections);
    res.render("collections", {
      collections,
      loggedIn: req.session.loggedIn,
      isCollections
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
