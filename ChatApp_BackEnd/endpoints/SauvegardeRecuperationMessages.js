const express = require('express')
const router = express.Router()
const SMSController = require('../controllers/SMS.controller')


// Route pour récupérer tous les contacts
router.get('/', SMSController.findAll);

// Route pour créer un nouveau contact
router.post('/newsms', SMSController.create);

// Route pour récupérer un contact par ID
router.get('/:id', SMSController.findOneCon);

// Route pour mettre à jour un contact par ID
router.get('/congroup', SMSController.findbycon);

// Route pour supprimer un contact par ID
router.delete('/:id', SMSController.delete);

module.exports = router;
