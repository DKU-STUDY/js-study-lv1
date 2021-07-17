const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const items = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
const save = () => {
  fs.writeFileSync('./data.json', JSON.stringify(items), 'utf-8');
};

const getItem = (req, res) => {
  res.json(items);
};

const postItem = (req, res) => {
  if (!req.body.content) return res.status(400).end();
  items.push({
    idx: uuidv4(),
    content: req.body.content,
    isComplete: false,
    createdAt: Date.now()
  });
  save();
  res.status(201).json(items);
};

const putItem = (req, res) => {
  const item = items.find((v) => v.idx === Number(req.params.idx));
  if (!item) return res.status(400).end();
  item.content = req.body.content;
  save();
  res.json(items);
};

const deleteItem = (req, res) => {
  const index = items.findIndex((v) => v.idx === req.params.idx);
  if (index === -1) return res.status(400).end();
  items.splice(index, 1);
  save();
  res.status(204).json(items);
};

const toggleItem = (req, res) => {
  const item = items.find((v) => v.idx === req.params.idx);
  if (!item) return res.status(400).end();
  item.isComplete = !item.isComplete;
  save();
  res.json(items);
};

module.exports = {
  getItem,
  postItem,
  putItem,
  deleteItem,
  toggleItem
};
