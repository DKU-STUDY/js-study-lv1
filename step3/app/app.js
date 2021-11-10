const express = require("express");
const fs = require("fs");
const app = express();

const db = require("./lib/db"); //찾았다.


app.use(express.static(__dirname + '/src'));

app.get('/', function (req,res){
    //path는 app.js 중심으로 !
    fs.readFile('index.html','utf-8', function (err, data){
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.end(data);
    });
});



app.listen(3001);