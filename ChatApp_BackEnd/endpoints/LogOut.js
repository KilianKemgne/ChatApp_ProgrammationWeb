
const express = require('express')
const router = express.Router()
const userCRUD = require('../controllers/user.controller')

router.get('/', (req, res, next)=>{
    // on detruit la session et on va a l'acceuil (/public)
    res.send('Deconnexion !')
})

// petit test de la methode findallusers
userCRUD.FindAllUsers()

module.exports = router