const express = require('express');

const router = express.Router();

const Controller = require('./controller');

router.post('/', Controller.Create);
router.post('/search', Controller.Search);
router.get('/', Controller.List);
router.get('/my/:id', Controller.MySports);
router.get('/:id', Controller.Read);
router.put('/:id', Controller.Update);
router.delete('/:id', Controller.Delete);

module.exports = router;