const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Category, Product } = require("../../models");
const express = require("express");
const app = express();
app.use(express.json());

// GET category by ID
router.get("/:id", async (req, res) => {
  const isProduct = true;

  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "url", "stock"],
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

    const { products } = categoryData.get({ plain: true });

    if (!categoryData) {
      res.status(404).json({ message: "Category with that id not found." });
      return;
    } else {
      res.render("category", {
        products,
        logged_in: req.session.logged_in,
        isProduct,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
