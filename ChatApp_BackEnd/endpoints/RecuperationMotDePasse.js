
const express = require('express')
const router = express.Router()
const variable = require('../variables/Variables')
const md5 = require("md5")

const UserModel = require('../modele/user.model')
const User = UserModel.User
const sequelize = UserModel.sequelize

const codeController = require('../controllers/code.controller')
const createCode = codeController.CreateCode

let code = undefined

const sendEmail = require('./sendemail')


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
                console.log('elements crees')
            }
        }).catch((error)=>{
            console.error("Echec de recherche des utilisateurs", error)
        })
    
    }).catch((error)=>{
        console.error('Impossible de creer cette table')
    })

}

let Random = (min, max) =>{
    let code = ''
    for(let i=0;i<4;i++){
        code += (Math.floor(Math.random() * (max - min)) + min).toString()
    }
    return code 
}

router.post('/', (req, res, next)=>{
    phonenumber = req.body.phoneNumber
    console.log('\n', req.body)

    console.log('phonenumber :', phonenumber)

    checkUser(parseInt(phonenumber))

    setTimeout(()=>{
        if(id == undefined || username == undefined){
            res.send({})
            console.log('utilisateur inexistant')
        }
        else{
            code = Random(1, 10)//on genere le code a 04 chiffres
            console.log('code genere :', code)
            req.session.user = {
                id: id,
                emailaddress: emailaddress,
                username: username,
                code: code
            }
            console.log(req.session)
            console.log('l\'id de la session est :', req.sessionID)
            sendEmail(emailaddress, code)
           
            setTimeout(()=>{console.log('envoi de mail en cours ...')}, 4000)
          
            createCode(code)
       
            setTimeout(()=>{console.log('enregistrement du code en cours ...')}, 100)
          
            res.send({'id': id, 'username': username, 'phonenumber': phonenumber,'emailaddress': emailaddress})
        }
    }, 100)

})

module.exports = router
