const express = require('express');
const db = require('./data/db.js');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req,res) => {
  res.render('index');
});

app.get('/api/todo', async (req, res) => {
  const json = await db.getData();
  res.json(json);
})

app.post('/api/todo', async (req, res) => {
  const json = await db.getData();
  json.item.push(req.body);
  await db.setData(json);
  res.json(json);
})

app.put('/api/todo/edit', async (req, res) => {
  const json = await db.getData();
  for (i=0; i<json.item.length; i++) {
    if(+json.item[i].id === +req.body.id) {
      json.item[i].content = req.body.content;
      json.item[i].checked = req.body.checked;
      break;
    } else {
      continue;
    };
  }
  await db.setData(json);
  res.json(json);
})

app.delete('/api/todo/delete', async (req, res) => {
  const json = await db.getData();
  json.item = json.item.filter(element => +element.id !== +req.body.id);
  console.log(json.item);
  await db.setData(json);
  res.json(json);
});

app.listen(3000, () => console.log("Server start. Port:3000"));
