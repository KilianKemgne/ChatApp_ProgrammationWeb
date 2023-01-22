
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    // pour les sms
    res.send('Envoie de SMS !')
})

module.exports = router