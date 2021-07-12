const express = require('express');
const router = express.Router();
const ctrl = require('./apiCtrl');

router.get('/items', ctrl.getItem);
router.post('/items', ctrl.postItem);
router.put('/items/edit/:idx', ctrl.putItem);
router.put('/items/toggle/:idx', ctrl.togleItem);
router.delete('/items/:idx', ctrl.delteItem);

module.exports = router;
