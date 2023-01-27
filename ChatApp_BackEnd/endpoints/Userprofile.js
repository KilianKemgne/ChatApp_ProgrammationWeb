
const express = require('express')
const router = express.Router()
const variable = require('../variables/Variables')

const UserModel = require('../modele/user.model')
const User = UserModel.User
const sequelize = UserModel.sequelize


let username
let id
let phonenumber
let emailaddress

async function checkUser(phonenumber) {
    username = undefined
    //phonenumber = undefined
    
    const resp = await sequelize.sync().then(()=>{
        User.findOne({
            where: {
                phonenumber: phonenumber
            }
        }).then((res)=>{
            console.log('resultat');
            console.log(res)
            if(res != null){
                username = res.dataValues.username
                id = res.dataValues.id
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
 
    // on verifie si cet utilisateur existe dans la BD (on hache le mot de passe)
    checkUser(phonenumber)

    // on renvoie le resultat de la requete au client
    setTimeout(()=>{
        // on va juste patienter 50 millisecondes pour que le resultat de la requete soit disponible
        if(username == undefined){
            //on retourne une erreur
            res.send({})// on renvoi une erreur
            console.log('utilisateur inexistant')
        }
        else{
            if(!req.session.user){
                req.session.user = {
                    id: id,
                    emailaddress: emailaddress,
                    username: username
                }
                console.log(`Vous etes connectes, bienvenue ${req.session.user.username} !`)
                console.log(req.session)
            }
            else{
                console.log('vous etiez deja connectes')
                console.log(req.session) 
            }
            //on renvoi le resultat (on ne lui envoi pas le password)
            res.send({'id': id, 'username': username, 'phonenumber': phonenumber,'emailaddress': emailaddress})
        }
    }, 100)

})

module.exports = router