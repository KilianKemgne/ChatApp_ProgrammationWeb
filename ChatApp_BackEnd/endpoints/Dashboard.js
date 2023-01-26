const express = require('express')
const router = express.Router()
const dashboardController = require('../controller/dashboard.controller')



module.exports = router;
const {Contact, sequelize} = require('../modele/contact.model')
const {SMS, sequelize} = require('../modele/sms.model')

router.get('/dashboardsms', async (req, res, next) => {
    
    const order = req.query.order || "desc"


    console.log("Finding all SMS for a specific contact")
    console.log("SMS", SMS)
    const sms = await SMS.findAll({
        where: {
            idUtilisateur: req.params.iduser
        },
        order: [
            ['creationdate', order]
        ]
    })
    console.log("SMS  =>", sms)

    
    res.status(200).send(sms)
})

router.get('/dashboardcontact', async (req, res, next) => {
    
    const order = req.query.order || "desc"


    console.log("Finding all SMS for a specific contact")
    console.log("contact", Contact)
    const contact = await Contact.findAll({
        where: {
            idUtilisateur: req.params.iduser
        }
    })
    console.log("Contact  =>", contact)

    
    res.status(200).send(contact)
})
