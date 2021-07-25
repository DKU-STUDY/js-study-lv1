const express = require('express');
const path = require('path');
const pageRouter = require('./routes/index.js');
const itemRouter = require('./routes/item.js');

const app = express();
const PORT = 3000;

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '')));
app.use('/', pageRouter);
app.use('/api/items', itemRouter);

app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} 라우터가 존재하지 않습니다.`);
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 404).json(err.message);
})

app.listen(PORT, () => {
    console.log("server start");
});