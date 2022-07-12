const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');

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
app.get('/dashboard/products', (req, res) => {
  res.render('pages/products/show');
})

// CUSTOMER'S SECTION
app.get('/dashboard/customers', (req, res) => {
  res.render('pages/customers/show');
})

// SUPPLIER'S SECTION
app.get('/dashboard/suppliers', (req, res) => {
  res.render('pages/suppliers/show');
})

app.get('/dashboard/suppliers/new', (req, res) => {
  res.render('pages/suppliers/new');
})

app.listen(4000, () => {
  console.log('Serving port 4000')
});
