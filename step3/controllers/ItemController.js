const express = require("express");
const Items = require("../models/Item.js");

const router = express.Router();

router.get('/', (request, response) => {
    Items.getItemList()
        .then(itemList => response.send(itemList))
        .catch(error => response.status(500).json(error));
});

router.post('/', (request, response) => {
    Items.insertItem([ request.body.content, false ])
        .then(() => response.redirect('/api/items'))
        .catch(error => response.status(500).json(error));
});

router.put('/:id', (request, response) => {
    Items.modifyItem([ request.body.content, request.params.id ])
        .then(() => response.redirect('/api/items'))
        .catch(error => response.status(500).json(error));
});

router.put('/toggle/:id', (request, response) => {
    Items.getItem([ request.params.id ])
        .then(item => {
            Items.toggleItem([ item.completed == true ? false : true, item.id ])
            .then(() => response.redirect('/api/items'))
            .catch(error => response.status(500).json(error));
        }).catch(error => response.status(500).json(error));
});

router.delete('/:id', (request, response) => {
    Items.deleteItem([ request.params.id ] )
        .then(() => response.redirect('/api/items'))
        .catch(error => response.status(500).json(error));
});

module.exports = router;

