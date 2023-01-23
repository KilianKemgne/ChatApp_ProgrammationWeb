
const express = require('express')
const router = express.Router()
const userCRUD = require('../controllers/user.controller')
const md5 = require("md5")

router.get('/', (req, res, next)=>{
    // on detruit la session et on va a l'acceuil (/public)
    res.send('Deconnexion !')
})

// petit test de la methode findallusers
userCRUD.FindAllUsers()

setTimeout(()=>{console.log(md5('finalclap'))}, 100) // 26069f31af1fb0e4fac5841121496687

module.exports = router