const express = require('express');
const fs = require('fs');
const app = express();

const items = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

const save = () => {
    fs.writeFileSync('./data.json', JSON.stringify(items), 'utf-8');
}



    app.use(express.json());

    app.set('port', process.env.PORT || 3000);

    app.get('/', (Request, Response) => {
        Response.send("Root 페이지입니다.");
    });

    app.put('/api/items/:idx', (request, response) => {
        const item = items.find(v => v.idx === Number(request.params.idx));
        item.content = request.body.content;
        save();
        response.json(items);
    });
    app.post('/api/items', (request, response) => {
        items.push({
            idx: Math.max(0, ...items.map(v => v.idx)) + 1,
            content: request.body.content,
            completed: false,
            createdAt: Date.now()
        });
        save();
        response.json(items);
    });



    app.get('/api/items', (request, response) => {
        response.json(items);
    });
    
    app.delete("/api/items/:idx", (request, response) => {
        const index = items.findIndex(v => v.idx === Number(equest.params.idx));
        items.splice(index, 1);
        save();
        response.json(items);
  
    });

    app.put('/api/items/toggle/:idx', (req, res) => {
        const index = items.findIndex(v => v.idx === Number(req.params.idx));
        items[index].completed = !items[index].completed;
        save();
        res.json(items);
    });





app.listen(app.get('port'), () => {
    console.log('웹 서버가 실행 되었습니다.');
    console.log(`address: http://localhost:${app.get('port')}`);
});