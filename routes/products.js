const express = require('express');
const router = express.Router(); // will make a new router object

const Product = require('../models/products');
const categories = ['small', 'big', 'combo']

router.get('/', async (req, res) => {
  const products = await Product.find({});
  console.log('showing products page');
  res.render('pages/products/show', {products, categories});
})

router.get('/new', async (req, res) => {
  const suppliers = await Supplier.find({});
  res.render('pages/products/new', {suppliers, categories});
})

router.post('/', async(req, res) => {
  const product = new Product(req.body.product);
  await product.save();
  res.redirect('/dashboard/products');
})

module.exports = router;
