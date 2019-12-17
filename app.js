const cors = require('cors');
const ftp = require('./ftp');
const client = new ftp();

// подключение express
const express = require("express");

// создаем объект приложения
const app = express();

app.use(cors());

app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
  client.upload('test_file.txt', 'public_html/test_file.txt', 755);
  res.send('Hi');
});

app.get('/d', (req, res) => {
});

app.get('/g', (req, res) => {
  client.getDir().then(r => {
    console.log(r);
    res.send(r);
  });
});



app.listen(30001);
