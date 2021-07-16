const express = require('express');
const router = express.Router();
const ctrl = require('./apiCtrl');

router.get('/items', ctrl.getItem);
router.post('/items', ctrl.postItem);
router.put('/items/edit/:idx', ctrl.putItem);
router.put('/items/toggle/:idx', ctrl.toggleItem);
router.delete('/items/:idx', ctrl.deleteItem);

module.exports = router;
