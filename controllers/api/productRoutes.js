const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");
const sequelize = require("../../config/connection");
const express = require("express");
const app = express();
app.use(express.json());

// get one product
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Tag, attributes: ["tag_name"] }],
    });

    const product = productData.get({ plain: true });
    console.log(product, "here is the console.log");
    res.render("product", {
      product,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post("/new-product", async (req, res) => {
  try {
    const { product_name, price, url, stock, category_id } = req.body;

    if (!product_name) {
      return res.status(400).json({ error: "Product name is required" });
    }

    const newProduct = await Product.create({
      product_name,
      price,
      url,
      stock,
      category_id,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//   UPDATE product by ID
router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: "Category with that id not found." });
      return;
    }
    res.status(200).json({ message: "Category updated successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//   DELETE product by ID
router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: "No product found with that id." });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
