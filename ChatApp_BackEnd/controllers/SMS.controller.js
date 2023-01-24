//const sequelize = require('./user.model');
const {SMS, sequelize} = require('../modele/sms.model')


//ajouter un sms de test
/*SMS.create({
    content: 'nono',
    creationdate:  new Date('2023-02-10'),
    iduser: 2,
    idcontact: 1
}).then((sms)=>{
    console.log(sms)
}).catch((error)=>{
    console.error("Echec de creation de l'utilisateur", error)
})*/

// rechercher tous les sms
exports.findAll = (req, res) => {
    SMS.findAll().then(sms => {
        // envoie de tous les sms au client
        res.send(sms);
        console.log(sms)
    }).catch((error)=>{
        console.error("Echec de recherche des sms", error)
    })
    ;
}
/*
sequelize.sync().then(()=>{
    // Selectionner tous les sms
    SMS.findAll().then((res)=>{
        //console.log(res)
    }).catch((error)=>{
        console.error("Echec de recherche de tous les sms", error)
    })
}).catch((error)=>{
    console.error('Impossible de creer cette table')
})*/