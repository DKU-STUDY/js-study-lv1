const express = require('express');
const bodyParser = require('body-parser');
const itemController = require('./controllers/ItemController.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/items', itemController);

app.listen(PORT, () => {
   console.log("server start!!");
});

