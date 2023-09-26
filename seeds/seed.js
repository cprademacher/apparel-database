const { Sequelize } = require("sequelize");
const sequelize = require("../config/connection");
const { User, Product, Category, Tag, ProductTag } = require("../models");

const userData = require("./userData.json");
const productData = require("./productData.json");
const categoryData = require("./categoryData.json");
const tagData = require("./tagData.json");
const productTagData = require("./productTagData.json")

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const categories = await Category.bulkCreate(categoryData, {
    individualHooks: true,
    returning: true,
  });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const products = await Product.bulkCreate(productData, {
    individualHooks: true,
    returning: true,
  });

  const tags = await Tag.bulkCreate(tagData, {
    individualHooks: true,
    returning: true,
  });

  const productTag = await ProductTag.bulkCreate( productTagData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
