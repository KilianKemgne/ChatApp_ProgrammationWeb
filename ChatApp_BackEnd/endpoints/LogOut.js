
const express = require('express')
const router = express.Router()
const userCRUD = require('../controllers/user.controller')
const md5 = require("md5")

router.get('/', (req, res, next)=>{
    // on detruit la session et on va a l'acceuil (/public)
    req.session.destroy()
    res.send({})
})

module.exports = router