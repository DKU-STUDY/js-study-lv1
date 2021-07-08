const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const items = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

const save = () => {
  fs.writeFileSync('./data.json', JSON.stringify(items), 'utf-8');
};

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  items.push({
    idx: items.length + 1,
    content: req.body.content,
    completed: false,
    createdAt: Date.now()
  });
  save();
  res.json(items);
});

app.put('/api/items/:idx', (req, res) => {
  const item = items.find((v) => v.idx === Number(req.params.idx));
  item.content = req.body.content;
  save();
  res.json(items);
});

app.delete('/api/items/:idx', (req, res) => {
  const index = items.findIndex((v) => v.idx === Number(req.params.idx));
  items.splice(index, 1);
  save();
  res.json(items);
});

app.listen(PORT, () => {
  console.log('hello world');
});
