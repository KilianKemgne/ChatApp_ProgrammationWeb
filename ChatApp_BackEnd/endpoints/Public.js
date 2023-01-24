
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    // des qu'on lance l'application, on aboutit ici
    res.send('Connection etablie, bienvenue !')
    console.log('vous etiez deja connectes')
    console.log(req.session) 
})

module.exports = router