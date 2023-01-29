
const express = require('express')
const router = express.Router()
const variable = require('../variables/Variables')

const ContactModel = require('../modele/contact.model')
const SMSModel = require('../modele/SMS.model')
const Contact = ContactModel.Contact
const SMS = SMSModel.SMS
const sequelize = ContactModel.sequelize


let nbcontact
let nbsms
let iduser


async function getNumberofContacts(iduser) {
    nbcontact = 0
    const resp = await sequelize.sync().then(()=>{
        Contact.findAll({
            where: {
                iduser: iduser
            }
        }).then((res)=>{
            console.log('Voici tous les contacts :', res)
            if(res != null){
                nbcontact = res.length
            }
        }).catch((error)=>{
            console.error("Echec de recherche des Messages", error)
        })
    
    }).catch((error)=>{
        console.error('Impossible d\'acceder a la table Contact')
    })
}

async function getNumberofMessages(iduser) {
    nbsms = 0
    const resp = await sequelize.sync().then(()=>{
        SMS.findAll({
            where: {
                iduser: iduser
            }
        }).then((res)=>{
            console.log('Voici tous les messages :', res)
            if(res != null){
                nbsms = res.length
            }
        }).catch((error)=>{
            console.error("Echec de recherche des Messages", error)
        })
    
    }).catch((error)=>{
        console.error('Impossible d\'acceder a la table Contact')
    })
}

router.post('/', (req, res, next)=>{
    iduser = req.body.iduser
    console.log('req.body :', req.body)
 
    getNumberofContacts(iduser)

    getNumberofMessages(iduser)

    setTimeout(()=>{
        console.log('Nombre de contacts :', nbcontact, ', Nombre de messages :', nbsms)
        res.send({'iduser': iduser, 'nbcontact': nbcontact, 'nbsms': nbsms})
    }, 200)
})

module.exports = router
