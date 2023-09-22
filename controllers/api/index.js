const router = require('express').Router();
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const tagRoutes = require('./tagRoutes');

router.use('/users', userRoutes);
router.use('/category', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;