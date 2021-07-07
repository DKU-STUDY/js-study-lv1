const express = require("express");
const methodOverride = require("method-override");
const ItemService = require("../service/ItemService.js");

const app = express();
app.use(methodOverride('_method'));

app.get('/', (request, response) => {
    ItemService
        .getItemList()
        .then(itemList => response.render('../view/index.ejs', {
            'itemList': itemList
        }))
        .catch(error => console.log(error));
});

app.get('/insertForm', (request, response) => {
    response.render('../view/insertForm.ejs');
});

app.post('/insertItem', (request, response) => {
    const itemDTO = [ request.body.item, false, false ];
    ItemService.insertItem(itemDTO);
    response.redirect('/');
});

app.put('/modifyItem', (request, response) => {
    const itemDTO = [ request.body.content, request.body.seq ];
    ItemService.modifyItem(itemDTO);
    response.redirect('/');
});

app.delete('/deleteItem/:seq', (request, response) => {
    const itemDTO = [ request.params.seq ];
    ItemService.deleteItem(itemDTO);
    response.redirect('/');
});

app.put('/completeItem/:seq/:completed', (request, response) => {
    const itemDTO = [
        request.params.completed == 1 ? 0 : 1,
        request.params.seq
    ];
    ItemService.completeItem(itemDTO);
    response.redirect('/');
});

// url + 쿼리 문자열 사용 -> request.query
app.get('/toggleItem', (request, response) => {
    const itemDTO = [
        request.query.highlight == 1 ? 0 : 1,
        request.query.seq
    ];
    ItemService.toggleItem(itemDTO);
    response.redirect('/');
})

app.get('/item/:seq', (request, response) => {
    const itemDTO = [ request.params.seq ];
    ItemService
        .getItem(itemDTO)
        .then(item => response.render('../view/modifyForm.ejs', {
                'item': item[0]
        }))
        .catch(error => console.log(error));
});

module.exports = app;
