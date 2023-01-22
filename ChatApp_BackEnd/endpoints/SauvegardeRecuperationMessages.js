
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    // pour la sauvegarde et la recuperation de messages
    res.send('Sauvegarde et la recuperation de messages !')
})

module.exports = router