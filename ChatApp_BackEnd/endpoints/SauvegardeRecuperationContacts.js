
const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contact.controller')


// Route pour récupérer tous les contacts
router.get('/', contactController.findAll);

// Route pour créer un nouveau contact
router.post('/', contactController.create);

// Route pour récupérer un contact par ID
router.get('/:id', contactController.findOne);

// Route pour mettre à jour un contact par ID
router.put('/:id', contactController.update);

// Route pour supprimer un contact par ID
router.delete('/:id', contactController.delete);
router.post('/import',contactController.importContact)

module.exports = router;

