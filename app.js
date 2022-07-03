const express = require('express');
const app = express();
const path = require('path');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// to setup the path
app.set('views', path.join(__dirname, 'views'));
// ejs allows us to use javascript codes within html files
app.set('view engine', 'ejs');

// Parsing Middleware
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/dashboard', (req, res) => {
  console.log('you are logged in')
  res.render('dashboard');
})

app.listen(4000, () => {
  console.log('Serving port 4000')
});
