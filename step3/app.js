const express = require('express');
const app = express();

const api = require('./api');
const PORT = 3000;

app.use(express.json());
app.use('/api', api);

app.listen(PORT, () => {
  console.log('hello world');
});
