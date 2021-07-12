const express = require('express');
const app = express();
const fs = require('fs');

const api = require('./api');
const axios = require("axios");
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use('/api', api);
// app.get('/', (req, res) => {
//   res.send(fs.readFileSync('./index.html', 'utf-8'));
// })

app.listen(PORT, () => {
  console.log('hello world');
});
