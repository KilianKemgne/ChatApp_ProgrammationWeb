
const express = require('express')
const router = express.Router()
const variable = require('../variables/Variables')
const md5 = require("md5")

const UserModel = require('../modele/user.model')
const User = UserModel.User
const sequelize = UserModel.sequelize

sequelize.authenticate()
    .then(()=>{
        console.log('Connection a la BD reussie')
    })
    .catch((error)=>{
        console.error('Impossible d\'etablir la connexion')
    })

let username
let password
let id
let phonenumber
let emailaddress

async function checkUser(username, password) {
    id = undefined
    phonenumber = undefined
    const resp = await sequelize.sync().then(()=>{
        console.log('Table user cree avec succes')
        // Selectionner un utilisateur en particulier avec son username et password
        User.findOne({
            where: {
                username: username,
                password: password
            }
        }).then((res)=>{
            console.log(res)
            if(res != null){
                id = res.dataValues.id
                phonenumber = res.dataValues.phonenumber
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
    
    username = req.body.username
    password = req.body.password
    console.log('\n', req.body)
 
    
    checkUser(username, md5(password))

  
    setTimeout(()=>{
        if(id == undefined || phonenumber == undefined){
            
            res.send({})
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
            res.send({'id': id, 'username': username, 'phonenumber': phonenumber,'emailaddress': emailaddress})
        }
    }, 100)

})

module.exports = router
