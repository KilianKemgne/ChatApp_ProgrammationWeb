const express = require('express')
const router = express.Router()

const {SMS, sequelize} = require('../modele/sms.model')


// request for adding a new sms sms
//body : {content: "Message content", iduser: 1, idcontact: [1,2,3]}
router.post('/newsms', async (req, res, next) => {
    // recovery the paremeter of the request
    const {content, iduser, idcontact} = req.body
    //Equivalennt to: const content = req.body.content
    //Equivalent to : const iduser = req.body.iduser
    //Equivalent to : const idcontact = req.body.idcontact

    //Creation of the date
    const creationdate = new Date()

    //check if the idcontact comprise at least one element
    if (!idcontact || idcontact.length === 0) {
        //400 : Bad Request
        res.status(400).send({message: "Aucun contact selectionne"})
        return;
    }

    //Creer un SMS pour chaque contact et l'ajouter a la BD
    for (let i = 0; i < idcontact.length; i++) {
        //Creation du SMS
        const sms = await SMS.create({
            content: content,
            creationdate: creationdate,
            iduser: iduser,
            idcontact: idcontact[i]
        })

        //Verification si le SMS a ete ajoute a la BD
        if (!sms) {
            //500 : Internal Server Error
            res.status(500).send({message: "Erreur lors de l'ajout du SMS"})
            return;
        }
    }
    //200 : OK
    res.status(200).send({message: "SMS envoye"})
})

// GET Request to get all SMS
router.get('/', async (req, res, next) => {
    // "/?order=desc"  // from the newest to the oldest
    // "/?order=asc"   // from the oldest to the newest

    //Recuperation de l'ordre
    const order = req.query.order || "desc"


    console.log("Finding all SMS")
    console.log("SMS", SMS)
    const sms = await SMS.findAll({
        order: [
            ['creationdate', order]
        ]
    })
    console.log("SMS  =>", sms)

    //200 : OK
    res.status(200).send(sms)
})

//GET /sms/:contactId
//GET Request to get all SMS for a specific contact
router.get('/:contactId', async (req, res, next) => {

    // "/?order=desc"  // from the newest to the oldest
    // "/?order=asc"   // from the oldest to the newest

    //Recuperation of the order specify by the user
    const order = req.query.order || "desc"

    // pour les sms
    console.log("Finding all SMS for a specific contact")
    console.log("SMS", SMS)
    const sms = await SMS.findAll({
        where: {
            idcontact: req.params.contactId
        },
        order: [
            ['creationdate', order]
        ]
    })
    console.log("SMS  =>", sms)

    //200 : OK
    res.status(200).send(sms)
})


//GET /sms/groupby
//GET Request to get all SMS grouped by contact
router.get('/congroupby', async (req, res, next) => {
    // "/?order=desc"  // from the newest to the oldest
    // "/?order=asc"   // from the oldest to the newest

    //Recuperation de l'ordre
    const order = req.query.order || "desc"

    // pour les sms
    console.log("Finding all SMS grouped by contact")
    console.log("SMS", SMS)
    let sms = await SMS.findAll({
        attributes: ['id', 'content', 'creationdate', 'iduser', 'idcontact'],
       // group: ['idcontact'],
        order: [
            ['creationdate', order]
        ]
    })
    sms  = sms.map(
        (sms) => sms.dataValues
     ).reduce((acc, sms) => {
        const {idcontact} = sms
        if (!acc[idcontact]) {
            acc[idcontact] = [];
        }
        acc[idcontact].push(sms);
        return acc;
    })
    console.log("SMS  =>", sms)

    //200 : OK
    res.status(200).send(sms)
})


router.delete( '/:id', async (req, res, next)=>{

    
    SMS.destroy({
        where: {
            id: req.params.id        }
    }).then(() => {
        res.status(200).send("message supprimé avec succes.")

        console.log("message supprimé avec succes.")
    }).catch((error) => {
        res.status(400).send({message: "Erreur lors de la suppresion du message"})

        console.error('Erreur lors de la suppresion du message ', error);
    });
  
})

module.exports = router