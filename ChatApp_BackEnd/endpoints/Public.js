
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    // des qu'on lance l'application, on aboutit ici
    res.send('Connection etablie, bienvenue !')
})

module.exports = router