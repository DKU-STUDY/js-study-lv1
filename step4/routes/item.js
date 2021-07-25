const express = require("express");
const itemsRepository = require("../repository/ItemRepository.js");

const router = express.Router();

router.get('/', (request, response, next) => {
    itemsRepository
        .getItemList()
        .then(itemList => response.json(itemList))
        .catch(error => next(error));
});

router.post('/', (request, response, next) => {
    itemsRepository
        .insertItem([
            request.body.content,
            request.body.highlight,
            request.body.isComplete,
            request.body.selected,
        ])
        .then(() => response.json({ message: 'success' }))
        .catch(error => next(error));
});

router.delete('/', (request, response, next) => {
    itemsRepository
        .deleteItem([ request.body.id ] )
        .then(() => response.json({ message: 'success' }))
        .catch(error => next(error));
});

router.put('/:id', (request, response, next) => {
    itemsRepository
        .getItem([ request.params.id ])
        .then(item => {
            itemsRepository
                .selectItem([ !item.selected, item.id ])
                .then(() => response.json({ message: 'success'}))
        })
        .catch(error => next(error));
})

router.put('/', (request, response, next) => {
    itemsRepository
        .modifyItem([ request.body.content, request.body.id ])
        .then(() => response.json({ message: 'success' }))
        .catch(error => next(error));
});

router.put('/complete/:id', (request, response, next) => {
    itemsRepository
        .getItem([ request.params.id ])
        .then(item => {
            itemsRepository
                .completeItem([ !item.isComplete, item.id ])
                .then(() => response.json({ message: 'success'}))
        })
        .catch(error => next(error));
});

router.put('/toggle/:id', (request, response, next) => {
    itemsRepository
        .getItem([ request.params.id ])
        .then(item => {
            itemsRepository
                .toggleItem([ !item.highlight, item.id ])
                .then(() => response.json({ message: 'success'}))
        })
        .catch(error => next(error));
});

module.exports = router;

