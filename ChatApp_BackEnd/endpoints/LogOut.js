
const express = require('express')
const router = express.Router()
const userCRUD = require('../controllers/user.controller')
const md5 = require("md5")

router.get('/', async (req, res, next)=>{
    // on detruit la session et on va a l'acceuil (/public)
    await req.session.destroy()
    console.log('Deconnexion reussi')
    console.log('req.session:', req.session)
    res.send('Deconnexion reussie');
})

module.exports = router