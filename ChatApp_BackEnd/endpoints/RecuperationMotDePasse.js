
const express = require('express')
const router = express.Router()
const variable = require('../variables/Variables')
const md5 = require("md5")

const UserModel = require('../modele/user.model')
const User = UserModel.User
const sequelize = UserModel.sequelize

let code = undefined


let username
let password
let id
let phonenumber
let emailaddress

async function checkUser(phonenumber) {
    id = undefined
    username = undefined
    const resp = await sequelize.sync().then(()=>{
        console.log('Table user cree avec succes')
        // Selectionner un utilisateur en particulier avec son username et password
        User.findOne({
            where: {
                phonenumber: phonenumber
            }
        }).then((res)=>{
            console.log(res)
            if(res != null){
                id = res.dataValues.id
                username = res.dataValues.username
                password = res.dataValues.password
                emailaddress = res.dataValues.emailaddress
            }
        }).catch((error)=>{
            console.error("Echec de recherche des utilisateurs", error)
        })
    
    }).catch((error)=>{
        console.error('Impossible de creer cette table')
    })

}

router.post('/', (req, res, next)=>{
    // on recupere le corps de la requete post
    phonenumber = req.body.phoneNumber
    console.log('\n', req.body)

    // on recupere les informations correspondant de la base de donnees
    checkUser(parseInt(phonenumber))

    // on renvoie le resultat de la requete au client
    setTimeout(()=>{
        // on va juste patienter 50 millisecondes pour que le resultat de la requete soit disponible
        if(id == undefined || username == undefined){
            //on retourne une erreur
            res.send({})// on renvoi une erreur
            console.log('utilisateur inexistant')
        }
        else{
            if(!req.session.sessionid){
                req.session.sessionid = id.toString(10)+phonenumber.toString(10);
                req.session.userid = id
                req.session.username = username
                console.log(`Vous etes connectes, bienvenue ${username} !`)
                console.log(req.session)
            }
            else{
                console.log('vous etes deja connectes')
                console.log(req.session) 
            }
            //on renvoi le resultat (on ne lui envoi pas le password)
            res.send({'id': id, 'username': username, 'phonenumber': phonenumber,'emailaddress': emailaddress})
            code = 1234//on genere le code a 04 chiffres
        }
    }, 100)

})

module.exports = router