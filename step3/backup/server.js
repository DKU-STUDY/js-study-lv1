const express = require('express');
const fs = require('fs');
const app = express();

const TODO_PATH = './data/todoArr';

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let todolistArray = [];

fs.readFile(TODO_PATH, 'utf8', (err, data) => {
  if (data === "") {
    console.log("no todo to bring.");
  } else {
    todolistArray = JSON.parse(data);
  }
})

app.get('/api/todo', (req, res) => {
  res.json(todolistArray);
})

app.post('/api/todo', (req, res) => {
  todolistArray.push(req.body);
  
  fs.writeFile(TODO_PATH, JSON.stringify(todolistArray), 'utf8', (err, data) => {});
})

app.put('/api/todo/edit', (req, res) => {
  for (i=0; i < todolistArray.length; i++) {
    if (todolistArray[i].id === parseInt(req.body.id)) {
      todolistArray[i].content = req.body.content;
      todolistArray[i].checked = req.body.checked;
      break;
    } else {
      continue;
    }
  }
  fs.writeFile(TODO_PATH, JSON.stringify(todolistArray), 'utf8', (err, data) => {});
})

app.put('/api/todo/toggle', (req, res) => {
  for (i=0; i < todolistArray.length; i++) {
    if (todolistArray[i].id === parseInt(req.body.id)) {
      todolistArray[i].checked = req.body.checked;
      break;
    } else {
      continue;
    }
  }
  fs.writeFile(TODO_PATH, JSON.stringify(todolistArray), 'utf8', (err, data) => {});
})

app.delete('/api/todo/delete', (req, res) => {
  todolistArray = todolistArray.filter(element => element.id !== parseInt(req.body.id));
  fs.writeFile(TODO_PATH, JSON.stringify(todolistArray), 'utf8', (err, data) => {});
})

app.listen(3000, () => console.log("Server start. Port:3000"));
