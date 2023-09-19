const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Category, Product } = require("../../models");
const express = require("express");
const app = express();
app.use(express.json());


// GET all categores
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
      attribues: {
        include: [[sequelize.literal("(SELECT * FROM category)"), "products"]],
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET category by ID
router.get("/:id", async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [
          {
            model: Product,
            attributes: ["id", "product_name", "price", "stock"],
          },
        ],
        attributes: {
          include: [
            [
              sequelize.literal(
                "(SELECT COUNT(*) FROM product WHERE product.category_id = category_id)"
              ),
              "product_count",
            ],
          ],
        },
      });
  
      if (!categoryData) {
        res.status(404).json({ message: "Category with that id not found." });
        return;
      } else {
        res.status(200).json(categoryData);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;