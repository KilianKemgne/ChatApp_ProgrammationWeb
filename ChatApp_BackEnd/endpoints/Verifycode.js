const express = require('express')
const router = express.Router()
const UserModel = require('../modele/user.model')
const User = UserModel.User
const sequelize = UserModel.sequelize

const CodeModel = require('../modele/code.model')

const Code = CodeModel.Code

let code = ''

let username
let password
let id
let phonenumber
let emailaddress

let status

async function deleteCode(code){
    await sequelize.sync().then(()=>{
        Code.destroy({
            where: { code: code },
        }).then((res)=>{
            console.log('supression reussie')
        }).catch((error)=>{
            console.error("Echec de la suppression", error)
        })
     
    }).catch((error)=>{
        console.error('Impossible d\'acceder a la table')
    })
}

async function checkCode(code){
    status = false
    await sequelize.sync().then(()=>{
        Code.findOne({
            where: {
                code: code
            }
        }).then((res)=>{
            if(res != null){
                console.log('on entre ici !')
                status = true
                console.log('status :', status)
            } 
        }).catch((error)=>{
            console.error("Echec de recherche des utilisateurs", error)
        })
    }).catch((error)=>{
        console.error('Impossible d\'acceder a la table')
    })
   
}

async function getUser(id) {
    const resp = await sequelize.sync().then(()=>{
        console.log('Table user cree avec succes')
        // Selectionner un utilisateur en particulier avec son username et password
        User.findAll({
            where: {
                id: id
            }
        }).then((res)=>{
            //setTimeout(()=>{}, 100)
            console.log(res[0].dataValues)
            if(res != null){
                username = res[0].dataValues.username
                password = res[0].dataValues.password
                phonenumber = res[0].dataValues.phonenumber
                emailaddress = res[0].dataValues.emailaddress
                console.log('user OK')
            }
        }).catch((error)=>{
            console.error("Echec de recherche des utilisateurs", error)
        })
    
    }).catch((error)=>{
        console.error('Impossible de creer cette table')
    })

}

router.post('/', (req, res, next)=>{
    // on verifie que le code envoye correspond
    console.log('req.body :', req.body)
    console.log('l\'id de la session est :', req.sessionID)
    console.log('req.session :', req.session)
    code = req.body.code
    console.log('code :', code)
    

    // il nous faut absolument l'id
    id = 3 //req.session.user.id

    checkCode(code)

    console.log(console.log('status:'+status))
    
    console.log('Termine')

    setTimeout(()=>{
        if(status){
            console.log('it is comming')
            console.log('username :', username)
            // on supprime le code de la bd
            setTimeout(()=>{deleteCode(code)}, 100)
    
            // on attent un peu puis on envoi les informations au front
            setTimeout(()=>{getUser(id)}, 100)

            console.log('prepare to send')
            
            // on envoi le resultat au client
            setTimeout(()=>{console.log({'id': id, 'username': username, 'password': password, 'phonenumber': phonenumber,'emailaddress': emailaddress})}, 100)

            res.send({'id': id, 'username': username, 'password': password, 'phonenumber': phonenumber,'emailaddress': emailaddress})   
        }
        else{
            console.log('it is not comming')
            // on envoi une chaine vide 
            res.send({})
        }
    }, 100)    
})

module.exports = router