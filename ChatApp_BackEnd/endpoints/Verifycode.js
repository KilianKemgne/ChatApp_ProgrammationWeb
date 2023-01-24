const express = require('express')
const router = express.Router()

let code 

router.post('/', (req, res, next)=>{
    // on verifie que le code envoye correspond
    console.log('req.body', req.body)
    res.send(req.body)
})

module.exports = router