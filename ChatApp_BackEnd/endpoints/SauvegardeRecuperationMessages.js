
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    // pour la sauvegarde et la recuperation de messages
    res.send('Sauvegarde et la recuperation de messages !')
})

<<<<<<< HEAD

console.log("Finding all SMS")
console.log("SMS", SMS)
SMS.findAll().then(sms => {
    console.log("SMS  =>", sms)
    console.log(sms)
});*/

// requete post pour ajoiuter un nouvel sms
//corps requete : {content: "Message content", iduser: 1, idcontact: [1,2,3]}
router.post('/newsms', async (req, res, next) => {
    // Recuperation des donnees
    const {content, iduser, idcontact} = req.body
    //Equivalent de : const content = req.body.content
    //Equivalent de : const iduser = req.body.iduser
    //Equivalent de : const idcontact = req.body.idcontact

    //Creation de la date
    const creationdate = new Date()

    //Verification si les idcontact contiennent au moins un element
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

    //Recuperation de l'ordre
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
    const sms = await SMS.findAll({
        attributes: ['idcontact', [sequelize.fn('count', sequelize.col('idcontact')), 'count']],
        group: ['idcontact'],
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

createSMS("test", 1, [1, 2, 3])
createSMS("Bonjour 2", 1, [2])
createSMS("Bonjour 3", 1, [3])
createSMS("Bonjour 4", 1, [4])

testFunction()*/

=======
>>>>>>> parent of 343e4a6 (Sauvegarde et Recuperation des messages)
module.exports = router