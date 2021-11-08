const express = require('express');
const db = require('./data/db.js');
//const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/'), (req,res) => {
  res.render('index');
}

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
})
  .post(async (req, res) => {
    const result = {success: true};
    const folder = req.body.folder;
    try {
      const json = await db.getData();
      json.folder = folder;
      await dbsetData(json);
    } catch (err) {
      result.success = false;
      result.err = err;
    }
    res.json(result);
  });

  app.route('/api/task/:parent')
    .get(async (req,res) => {
      const result = { success: true};
      const parent = req.params.parent;
      try {
        const json = await db.getData();
        list = [];
        json.task.forEach((v, idx) => {
          if (v.parent === parent) {
            v.idx = idx;
            list.push(v)
          }
        })
        result.data = list
      } catch (err) {
        result.success = false;
        result.err = err;
      }
      res.json(result);
    })
    . post (async (req, res) => {
      const result = {success: true};
      const task = req.body.task;
      const parent = req.params.parent;
      try {
        const json = await db.getData();
        task.parent = parent;
        json.task.push(task);
        await db.setData(json);
      } catch (err) {
        result.seccess = false;
        result.err = err
      }
      res.json(result);
    })
    .put (async (req, res) => {
      const result = { success: true };
      const task = req.body.task;
      const idx = req.params.parent;
      try {
        const json = await db.getData();
        json.task[idx] = task;
        await db.setData(json);
      } catch (err) {
        result.seccess = false,
        result.err =err
      }
      res.json(result);
    })

app.listen(3000);