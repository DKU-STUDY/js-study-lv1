const express = require('express');
const fs = require('fs');
const app = express();

PORT = 5000;

const getItems = () => {
    const getItems = JSON.parse(fs.readFileSync('./data.json','utf-8'));
    return getItems;
}

const save = (items) => {
    fs.writeFileSync('./data.json',JSON.stringify(items),'utf-8');
}

function updateIdx(items) {
    for(let i =0;i<items.length;++i) {
        items[i].idx = i + 1; 
    }
}

app.use(express.json());
app.use(express.static(__dirname+'/src'));

app.get('/', (req, res) => {
	res.send(fs.readFileSync(__dirname+'/index.html','utf-8'));
});

app.get('/app/items', (req, res) => {
    const items = getItems();
    res.json(items);
})

app.post('/app/items',(req,res) =>  {
    const items = getItems();
    items.push({
        idx: items.length + 1,
        content: req.body.content,
        completed: false,
        createdAt: Date.now()
    })
    save(items);
    const recentItem = getItems();
    res.json(recentItem);
});

app.put('/app/items/:idx',(req,res) => {
    const items = getItems();
    const item = items.findIndex(v => v.idx === Number(req.params.idx));
    items[item].content = req.body.content;
    save(items);
    const recentItem = getItems();
    res.json(recentItem);
})

app.put('/app/items/toggle/:idx',(req,res) => {
    const items = getItems();
    const item = items.findIndex(v => v.idx === Number(req.params.idx));
    items[item].completed = !items[item].completed;
    save(items);
    const recentItem = getItems();
    res.json(recentItem);
})

app.delete('/app/items/:idx',(req,res) => {
    const items = getItems();
    const index = items.findIndex(v => v.idx === Number(req.params.idx));
    items.splice(index,1);
    updateIdx(items);
    save(items);
    getItems(res);
    const recentItem = getItems();
    res.json(recentItem);
})

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
});
