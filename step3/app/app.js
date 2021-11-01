const express = require("express")
const fs = require("fs");
const app = express();

const items = [{
  id: "cheese",
  calorie: "402kcal"
}];

const newItem = {
  id: "butter",
  calorie: "716.8kcal"
};

// html 불러오기
app.get("/", function (req, res) {
  fs.readFile('index.html', function (error, data) {
    if (error) {
      console.log(error);
    } else {
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      res.end(data);
    };
  });
});

// 아이템 조회
app.get("/api/items", function (req, res) {
  res.json(items);
});

// 아이템 추가 :: 추가한 아이템이 "null"이 됨???
app.post("/api/items", function (req, res) {
  items.push(req.body);
  res.json(items);
});

// 아이템 수정
// 아이템 토글
// 아이템 삭제

app.listen(3000, function() {
  console.log("Server start.");
});