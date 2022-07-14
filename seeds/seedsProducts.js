const mongoose = require('mongoose');

// require model database
const Product = require('../models/products');

mongoose.connect('mongodb://localhost:27017/crm', { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })

  const seedProducts = [
    {
      name: 'India Kaapi Royal',
      intensity: 'Dark Roasting',
      weight: '200g',
      price: 5.9,
      category: 'small',
      supplier: '62cd88d87e500d2ca3091323'
    },
    {
      name: 'Brasil Cerrado Diamond',
      intensity: 'Dark Roasting',
      weight: '1000g',
      price: 29.5,
      category: 'big',
      supplier: '62cd88d87e500d2ca3091323'
    },
    {
      name: 'Four Pack Blend',
      intensity: 'Light Roasting',
      weight: '4x100g',
      price: 14.5,
      category: 'combo',
      supplier: '62cd88d87e500d2ca3091323'
    }
  ]

  // if any of the seedProducts dont passed
  // mongoose's validation, then nothing will be inserted
  Product.insertMany(seedProducts)
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
