const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');

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

app.listen(4000, () => {
  console.log('Serving port 4000')
});
