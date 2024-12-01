const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
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

app.post('/kontakt', (req, res) => {
  const {email, message} = req.body;

  const sql = 'INSERT INTO messages (email, message) VALUES ("' + email + '","' + message + '");';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result.insertId);
    res.redirect('/');
  });
});

app.get('/api/contact-messages', (req, res) => {
  const sql = 'SELECT * FROM messages';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  })
})

app.get('/api/contact-messages/:id', (req, res) => {
  const messageId = req.params.id;
  const sql = 'SELECT * FROM messages where id = ' + messageId;

  db.query(sql, [messageId], (err, result) => {
    if (err) throw err;
    if(result.length === 0 ){
      return res.status(404).send("Nie ma wiadomości o takim id");
    }
    res.json(result[0]);
  })
})

app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port, hostname, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = app;
