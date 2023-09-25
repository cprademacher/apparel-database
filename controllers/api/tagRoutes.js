const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Tag, Product, ProductTag } = require("../../models");
const express = require("express");
const app = express();
app.use(express.json());


// GET tag by ID
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }
      ],});

      const collection = tagData.get({ plain: true });
      console.log(collection, "here is the console.log");
      res.render("collection-products", {
        collection,
        logged_in: req.session.logged_in,
      });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;