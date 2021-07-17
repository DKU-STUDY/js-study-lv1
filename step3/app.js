const express = require('express');
const cors = require('cors');
const app = express();

const api = require('./api');
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/api', api);

app.listen(PORT, () => {
  console.log('hello world!');
});
