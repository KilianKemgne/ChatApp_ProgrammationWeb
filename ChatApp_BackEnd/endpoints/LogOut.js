
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    // on detruit la session et on va a l'acceuil (/public)
    res.send('Deconnexion !')
})

module.exports = router