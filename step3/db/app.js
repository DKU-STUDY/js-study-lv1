const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const app = express();

const db = mysql.createConnection(dbconfig);





    app.use(express.json());

    app.set('port', process.env.PORT || 3306);

    app.get('/', (Request, Response) => {
        Response.send("Root 페이지입니다.");
    });

    app.put('/api/items/:idx', (request, response) => {
        const IDX = request.params.idx;
        const content = request.body.content;
        
        const query = `UPDATE items SET content=? where idx=?`
        db.connection.query(query, [content, IDX], (err, result) => {
            if (err) throw error;
            response.send(result);
        });
    });
    app.post('/api/items', (request, response) => {
        const newItem = {
            idx: Math.max(0, ...items.map(v => v.idx)) + 1,
            content: request.body.content,
            completed: false,
            createdAt: Date.now()
        };
        const query = `INSERT into items SET ?`;
        db.connection.query(query, newItem, (err, result) => {
            if (err) throw error;
            response.send(result);
        });
    });



    app.get('/api/items', (request, response) => {
        connection.query("SELECT * from items", (err, result) => {
            if (err) throw error;
            response.send(result);
        });
    });
    
    app.delete("/api/items/:idx", (request, response) => {
        const IDX = request.params.idx;
        const query = `DELETE FROM items where id=?`
        db.connection.query(query, IDX, (err, result) => {
            if (err) throw error;
            response.send(result);
        });
    });

    app.put('/api/items/toggle/:idx', (req, res) => {
        const IDX = req.params.idx;
        const COMPLETED = `SELECT completed from items where idx=${IDX}`;
        const update = `UPDATE items SET completed!=? where idx=?`
        db.connection.query(update, [COMPLETED, IDX], (err, result) => {
            if (err) throw error;
            res.send(result);
        });
    });





app.listen(app.get('port'), () => {
    console.log('웹 서버가 실행 되었습니다.');
    console.log(`address: http://localhost:${app.get('port')}`);
});