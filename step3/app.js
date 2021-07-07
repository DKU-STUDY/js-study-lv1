const express = require('express');
const bodyParser = require('body-parser');   // POST request data의 body로부터 parameter들을 편리하게 추출할 수 있다.
const controller = require('./controller/ItemController.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));  // url 쿼리 스트링을 파싱 ex) ?seq=1&title=express -> { seq: '1', title: 'express' }
app.use(bodyParser.json());

// 뷰 엔진 ejs 설정
app.set('view engine', 'ejs');

// '/' 이하 모든 요청을 ./controller/ItemController.js에 위임
app.use('/', controller);

app.listen(PORT, () => {
   console.log("server start!!");
});

