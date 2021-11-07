const express = require('express');
const db = require('./data/db.js');
//const fs = require('fs');
const app = express();

app.route('/api/folder')
  .get(async (req, res) => {
  const result = {success: true};
  try {
    const json = await db.getData();
    result.data = json.folder;
  } catch (err) {
    result.success = false;
    result.err = err;
  }
  res.json(result);
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000);