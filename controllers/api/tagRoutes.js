const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Tag, Product, ProductTag } = require("../../models");
const express = require("express");
const app = express();
app.use(express.json());


// GET all tags
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll();
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET tag by ID
router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id);
    if (!tagData) {
      res.status(404).json({ message: "No record with this ID" });
    } else {
      res.status(201).json(tagData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;