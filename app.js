const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override'); //to be able to use app.put

// require model database
const Product = require('./models/products');
const Supplier = require('./models/supplier');
const categories = ['small', 'big', 'combo']

mongoose.connect('mongodb://localhost:27017/crm', { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })


// Static Files
app.use(express.static(path.join(__dirname, 'public')));


// ejs allows us to use javascript codes within html files
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

// to setup the path
app.set('views', path.join(__dirname, 'views'));

// Parsing Middleware
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/testing', (req, res) => {
  res.render('testing');
})

// this is just for designing purposes, must be deleted once deployed because dashboard must depend on who was logged in
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
})

app.post('/dashboard', (req, res) => {
  console.log('you are logged in')
  res.render('dashboard');
})

// PRODUCT'S SECTION
app.get('/dashboard/products', async (req, res) => {
  const products = await Product.find({});
  console.log('showing products page');
  res.render('pages/products/show', {products, categories});
})

app.get('/dashboard/products/new', async (req, res) => {
  const suppliers = await Supplier.find({});
  res.render('pages/products/new', {suppliers, categories});
})

app.post('/dashboard/products', async(req, res) => {
  const product = new Product(req.body.supplier);
  await product.save();
  res.redirect('/dashboard/products');
})

// CUSTOMER'S SECTION
app.get('/dashboard/customers', (req, res) => {
  res.render('pages/customers/show');
})

// SUPPLIER'S SECTION
app.get('/dashboard/suppliers', async (req, res) => {
  const suppliers = await Supplier.find({});
  res.render('pages/suppliers/show', {suppliers});
})

app.get('/dashboard/suppliers/new', (req, res) => {
  res.render('pages/suppliers/new');
})

app.get('/dashboard/suppliers/:id', async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findById(id);
  res.render('pages/suppliers/show', {supplier});
} )

// to add a new supplier
app.post('/dashboard/suppliers', async(req, res) => {
  const supplier = new Supplier(req.body.supplier);
  await supplier.save();
  res.redirect(`/dashboard/${supplier._id}`);
})

// EDIT ROUTES
app.get('/dashboard/suppliers/:id/edit', async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findById(id);
  res.render('pages/suppliers/edit', {supplier});
} )

app.put('/dashboard/suppliers', async(req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  console.log(req.body);
  res.redirect('pages/suppliers/show', {supplier})
})

// Delete route
app.delete('/dashboard/suppliers', async(req, res) => {
  const { id } = req.params;
  const deleted = await Supplier.findByIdAndDelete(id);
  console.log(`${deleted.name} has been deleted`)
  res.redirect('/dashboard/suppliers/show');
})

/*----------------------*/

app.listen(4000, () => {
  console.log('Serving port 4000')
});
