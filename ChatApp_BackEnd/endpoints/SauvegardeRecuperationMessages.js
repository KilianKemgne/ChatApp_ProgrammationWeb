const express = require('express')
const router = express.Router()
const SMSController = require('../controllers/SMS.controller')


// path to get all the sms
router.get('/', SMSController.findAll);

// path to create a new sms
router.post('/newsms', SMSController.create);

// path to get the sms send to one contact
router.get('/:id', SMSController.findOneCon);

// path to get all the sms by contact
router.get('/congroup', SMSController.findbycon);

// path to delete a sms
router.delete('/:id', SMSController.delete);

module.exports = router;
