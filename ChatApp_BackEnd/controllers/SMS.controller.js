//const sequelize = require('./user.model');
const {SMS, sequelize} = require('../modele/SMS.model')
const {Contact} = require('../modele/contact.model')
const {sendSms} = require('../endpoints/EnvoiSMS')
const { conflicts } = require('yargs')
const { SequelizeScopeError } = require('sequelize')

let cont

// find all  sms
exports.findAll = async (req, res) => {
   

    const order = req.query.order || "desc"


    console.log("Finding all SMS")
    console.log("SMS", SMS)
    const sms = await SMS.findAll({
        
        order: [
            ['createdAt', order]
        ]
    })
    console.log("SMS  =>", sms)

  
    res.status(200).send(sms)
}

exports.create = async (req, res) => {
    // recovery the paremeter of the request
    const {iduser ,content, idcontact} = req.body
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

    //Create a sms for each contact
    for (let i = 0; i < idcontact.length; i++) {
        //Creation of the SMS
        const sms = await SMS.create({
            content: content,
            creationdate: creationdate,
            iduser: iduser,
            idcontact: idcontact[i]
        })

        const cont = await Contact.findAll({
            where: {
                id: sms.idcontact
            }
        })
        cont.map((content) => {
            console.log(content);
            console.log(content.dataValues.phonenumber);
            sendSms(content.dataValues.phonenumber, sms.content)
        })
        

        //Verification 
        if (!sms) {
            //500 : Internal Server Error
            res.status(500).send({message: "Erreur lors de l'ajout du SMS"})
            return;
        }
    }
    //200 : OK
    res.status(200).send({message: "SMS envoye"})
}

exports.findOneCon = async (req, res) => {

    // "/?order=desc"  // from the newest to the oldest
    // "/?order=asc"   // from the oldest to the newest

    //Recuperation of the order specify by the user
    const order = req.query.order || "desc"


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
}

exports.findbycon = async (req, res) => {
    // "/?order=desc"  // from the newest to the oldest
    // "/?order=asc"   // from the oldest to the newest

    //Recuperation of the order
    const order = req.query.order || "desc"

    // for the sms
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
}

exports.delete = async (req, res)=>{

    
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
  
}
