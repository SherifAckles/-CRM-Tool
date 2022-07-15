const express = require('express');
const router = express.Router();

// require model database
const Supplier = require('../models/supplier');

router.get('/', async (req, res) => {
  const suppliers = await Supplier.find({});
  res.render('pages/suppliers/show', {suppliers});
})

router.get('/new', (req, res) => {
  res.render('pages/suppliers/new');
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findById(id);
  res.render('pages/suppliers/index', {supplier});
} )

// EDIT ROUTES
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findById(id);
  res.render('pages/suppliers/edit', {supplier});
} )

// to edit supplier
router.put('/:id', async(req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findByIdAndUpdate(id, { ...req.body.supplier })
  console.log(req.body);
  res.redirect(`/dashboard/suppliers/${supplier._id}`);
})

// to add a new supplier
router.post('/', async(req, res) => {
  const supplier = new Supplier(req.body.supplier);
  await supplier.save();
  res.redirect(`/dashboard/${supplier._id}`);
})

// // Delete route
// app.delete('/dashboard/suppliers', async(req, res) => {
//   const { id } = req.params;
//   const deleted = await Supplier.findByIdAndDelete(id);
//   console.log(`${deleted.name} has been deleted`)
//   res.redirect('/dashboard/suppliers/show');
// })

module.exports = router;
