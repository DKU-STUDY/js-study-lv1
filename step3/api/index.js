const express = require('express');
const router = express.Router();
const control = require('./apiControl');

router.get('/items', control.getItem);
router.post('/items', control.postItem);
router.put('/items/edit/:idx', control.putItem);
router.put('/items/toggle/:idx', control.toggleItem);
router.delete('/items/:idx', control.deleteItem);

module.exports = router;
