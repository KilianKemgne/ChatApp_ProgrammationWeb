
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    res.send('Connection etablie, bienvenue !')
    console.log('vous etiez deja connectes')
    console.log(req.session) 
})

module.exports = router
