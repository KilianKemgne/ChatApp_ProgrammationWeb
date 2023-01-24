const express = require('express')
const router = express.Router()

const {SMS, sequelize} = require('../modele/sms.model')

/*
//add a sms for test
SMS.create({
    content: 'test',
    creationdate:  new Date(),
    iduser: 1,
    idcontact: 1
}).then((sms)=>{
    console.log(sms)
})


console.log("Finding all SMS")
console.log("SMS", SMS)
SMS.findAll().then(sms => {
    console.log("SMS  =>", sms)
    console.log(sms)
});*/

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
router.get('/sms', async (req, res, next) => {
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
router.get('/sms/:contactId', async (req, res, next) => {

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


/*async function testFunction() {

     let  sms =( await SMS.findAll({
        attributes: ['id', 'content', 'creationdate', 'iduser', 'idcontact']

    }))

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

    console.log("REsult  =>", sms)
}


//A funnction that creates a new SMS, takes the content, the iduser and the idcontact as parameters
async function createSMS(content, iduser, idcontact) {
    //Creation of the  date
    const creationdate = new Date()

    //Create a sms for each contact and add in the BD
    for (let i = 0; i < idcontact.length; i++) {
        //Creation of SMS
        const sms = await SMS.create({
            content: content,
            creationdate: creationdate,
            iduser: iduser,
            idcontact: idcontact[i]
        })


    }
    //200 : OK

}


testFunction()*/

module.exports = router