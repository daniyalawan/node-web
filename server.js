const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} | Method: ${req.method} | URL: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to write to server.log');
    }
  });
  next();
});
//MAINTENANCE MODE
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website\'s homepage'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

var errorMessage = {
  errorCode: 404,
  description: 'Route not found!'
}
app.get('/bad', (req, res) => {
  res.send(errorMessage);
});

app.listen(3000, () => {
  console.log('Server is up running on port 3000');
});
