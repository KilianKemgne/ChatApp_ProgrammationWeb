
const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contact.controller')


router.get('/', contactController.findAll);

router.post('/', contactController.create);

router.get('/:id', contactController.findOne);

router.put('/:id', contactController.update);

router.delete('/:id', contactController.delete);
router.post('/import',contactController.importContact)

module.exports = router;

