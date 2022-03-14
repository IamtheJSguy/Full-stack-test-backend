const express = require('express');

const router = express.Router();

const Controller = require('./controller');

router.post('/', Controller.Create);
router.post('/login', Controller.Login);
router.get('/', Controller.List);
router.get('/:id', Controller.Read);
router.put('/:id', Controller.Update);
router.delete('/:id', Controller.Delete);

module.exports = router;