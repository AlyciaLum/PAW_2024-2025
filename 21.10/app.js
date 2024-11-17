const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const port = 3000;
const hostname = '127.0.0.1';

const app = express();

dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Strona główna' });
});

app.get('/o-nas', (req, res) => {
  res.render('about', { title: 'O firmie' });
});

app.get('/oferta', (req, res) => {
  res.render('offer', { title: 'Oferta' });
});

app.get('/kontakt', (req, res) => {
  res.render('contact', { title: 'Oferta' });
});

app.post('/kontakt', (req, res) => {
  console.log("Dane z formularza:", req.body);
  res.redirect('/');
});


app.listen(port, hostname, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = app;
