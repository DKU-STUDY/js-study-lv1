const express = require("express");
const itemsRepository = require("../repository/ItemRepository.js");

const router = express.Router();

router.get('/', (request, response) => {
    itemsRepository.getItemList()
        .then(itemList => response.json(itemList));
});

router.post('/', (request, response) => {
    itemsRepository.insertItem([
        request.body.content,
        request.body.highlight,
        request.body.isComplete,
        request.body.selected,
    ]).then(() => response.json({ message: 'success' }));
});

router.delete('/', (request, response) => {
    itemsRepository.deleteItem([ request.body.id ] )
        .then(() => response.json({ message: 'success' }));
});

router.put('/:id', (request, response) => {
    itemsRepository.getItem([ request.params.id ])
        .then(item => {
            itemsRepository.selectItem([ !item.selected, item.id ])
                .then(() => response.json({ message: 'success'}))
        });
})

router.put('/', (request, response) => {
    itemsRepository.modifyItem([ request.body.content, request.body.id ])
        .then(() => response.json({ message: 'success' }));
});

router.put('/complete/:id', (request, response) => {
    itemsRepository.getItem([ request.params.id ])
        .then(item => {
            itemsRepository.completeItem([ !item.isComplete, item.id ])
                .then(() => response.json({ message: 'success'}))
        });
});

router.put('/toggle/:id', (request, response) => {
    itemsRepository.getItem([ request.params.id ])
        .then(item => {
            itemsRepository.toggleItem([ !item.highlight, item.id ])
                .then(() => response.json({ message: 'success'}))
        });
});

module.exports = router;

