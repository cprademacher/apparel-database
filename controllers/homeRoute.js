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
      logged_in: req.session.logged_in,
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
      include: [{ model: Product }],
    });
    const collections = collectionsData.map((collections) =>
      collections.get({ plain: true })
    );
    console.log(collectionsData, collections);
    res.render("collections", {
      collections,
      logged_in: req.session.logged_in,
      isCollections,
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

// get route for sign up
router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

module.exports = router;
