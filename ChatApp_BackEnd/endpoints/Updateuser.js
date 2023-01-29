
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

let newusername
let newemailaddress
let newphonenumber

async function checkUser(id) {
    username = undefined
    phonenumber = undefined
    const resp = await sequelize.sync().then(()=>{
        User.findOne({
            where: {
                id: id
            }
        }).then((res)=>{
            console.log(res)
            if(res != null){
                username = res.dataValues.username
                phonenumber = res.dataValues.phonenumber
                emailaddress = res.dataValues.emailaddress
                if(newusername != username || newemailaddress != emailaddress || newphonenumber != phonenumber){
                    username = newusername
                    emailaddress = newemailaddress
                    phonenumber = newphonenumber
                    // mise a jour de la BD
                    User.update(
                        {
                            username: username,
                            phonenumber: phonenumber,
                            emailaddress: emailaddress
                        },
                        {
                            where: { id: id }
                        }
                    ).then((res)=>{console.log('UPDATE:', res)})
                }
            }
        }).catch((error)=>{
            console.error("Echec de recherche des utilisateurs", error)
        })
    
    }).catch((error)=>{
        console.error('Impossible de creer cette table')
    })

}

router.post('/', (req, res, next)=>{
    
    id = req.body.id
    newusername = req.body.userName
    newemailaddress = req.body.emailAddress
    newphonenumber = req.body.phoneNumber

    console.log('\n', req.body)
    console.log('req.session:', req.session)
 
    checkUser(id)

    setTimeout(()=>{
       
        console.log('req.session:', req.session)
        if(username == undefined || phonenumber == undefined){
            
            res.send({})
            console.log('utilisateur inexistant')
        }
        else{
            // on met a jour la session
            req.session.user = {
                id: id,
                emailaddress: emailaddress,
                username: username
            }
            console.log(`La session a ete mise a jour, bienvenue ${req.session.user.username} !`)
            console.log(req.session)
            //on renvoi le resultat (on ne lui envoi pas le password)
            res.send({'id': id, 'username': username, 'phonenumber': phonenumber,'emailaddress': emailaddress})
        }
    }, 100)

})

module.exports = router
