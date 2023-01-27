
const express = require('express')
const router = express.Router()
const variable = require('../variables/Variables')
const md5 = require("md5")

const UserModel = require('../modele/user.model')
const User = UserModel.User
const sequelize = UserModel.sequelize

// // on teste la connexion a la base de donnees
sequelize.authenticate()
    .then(()=>{
        console.log('Connection a la BD reussie')
    })
    .catch((error)=>{
        console.error('Impossible d\'etablir la connexion')
    })

let status = false
let userExist = false
let id

async function createUser(username, password, phonenumber, emailaddress) {
    status = false
    userExist = false

    const resp = await sequelize.sync().then(()=>{
        // on verifie d'abord qu'un utilisateur ayant ces identifiants (username, password) n'existe pas dans la BD
        User.findOne({
            where: {
                username: username,
                password: password
            }
        }).then((res)=>{
            console.log(res)
            if(res != null){
                userExist = true
            }
        }).catch((error)=>{
            console.error("Echec de recherche des utilisateurs")
        })

        // si on ne trouve aucun usilisateur avec ses identifiants, alors on ajoute notre utilisateur
        if(!userExist){
            User.create({
                username: username,
                password: password,
                phonenumber: phonenumber,
                emailaddress: emailaddress
            }).then((res)=>{
                console.log(res)
                // id = res.id
                status = true
            }).catch((error)=>{
                console.error("Echec de creation de l'utilisateur", error)
            })
        }
        
    }).catch((error)=>{
        console.error('Impossible de creer cette table')
    })

}

router.post('/', (req, res, next)=>{
    // on recupere le corps de la requete post
    let username = req.body.username
    let password = req.body.password
    let phonenumber = parseInt(req.body.phoneNumber)
    let emailaddress = req.body.emailAddress
    console.log('\nreq.body:', req.body)
    console.log('req.session:', req.session)

    // on ajoute ces informations dans la base de donnees (on cree un nouvel utilisateur avec ces informations)
    createUser(username, md5(password), phonenumber, emailaddress)

    // on renvoie le resultat de la requete au client
    setTimeout(()=>{
        if(status){
            res.send({'id': id, 'username': username, 'phonenumber': phonenumber})
        }
        else{
            console.log('Utilisateur existant')
            res.send({})
        }
    },100)

})

module.exports = router