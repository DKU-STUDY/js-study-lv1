const express = require("express");
const fs = require("fs");
const app = express();

const db = require("./lib/db"); //찾았다.
db.db.connect();
app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.use(express.static(__dirname + '/src'));

app.get('/', function (req, res) {
    //path는 app.js 중심으로 !
    fs.readFile('index.html', 'utf-8', function (err, data) {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.end(data);
    });
});

app.post('/insert', function (req, res) {
    //db.connect();

    console.log(req.body.pTxt);
    let rcvTxt = req.body.pTxt;
    let insDate = dateFormat(new Date());
    let insSql = `INSERT INTO TODO(CONTENT, DATE) values ('${rcvTxt}', '${insDate}')`;
    console.log(insSql);

    db.db.query(insSql);
});

app.post('/delete', function (req, res) {
    //db.connect();

    console.log(req.body.trashP);
    let rcvTsTxt = req.body.trashP;
    let insTsDate = dateFormat(new Date());
    let insTsSql = `INSERT INTO TODO_TRASH(CONTENT, DATE) values ('${rcvTsTxt}', '${insTsDate}')`;
    console.log(insTsSql);

    db.db.query(insTsSql);
});

app.get('/completeList', function(req,res){
    let selSql = `SELECT * FROM TODO`;
    db.db.query(selSql, function (err, results, fields){
        jResults = JSON.stringify(results);
        console.log(jResults);
        res.json(jResults);
    });
});

app.get('/trash', function(req,res){
    let selSql = `SELECT * FROM TODO_TRASH`;
    db.db.query(selSql, function (err, results, fields){
        jResults = JSON.stringify(results);
        console.log(jResults);
        res.json(jResults);
    });
});


function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    /*hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;*/

    return date.getFullYear() + '-' + month + '-' + day;
}

app.listen(3001);