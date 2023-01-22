
const express = require('express')
const router = express.Router()
const variable = require('../variables/Variables')


const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    variable.DB_NAME,
    variable.USER_NAME,
    variable.USER_PASSWORD,
    {
        host: variable.DB_HOST,
        port: variable.DB_PORT,
        dialect: variable.DB_DIALECT
    }
)
// on teste la connexion a la base de donnees
sequelize.authenticate()
    .then(()=>{
        console.log('Connection a la BD reussie')
    })
    .catch((error)=>{
        console.error('Impossible d\'etablir la connexion')
    })


const User = sequelize.define("users",{
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phonenumber:{
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    // emailaddress:{
    //     type: DataTypes.STRING,
    //     allowNull: true
    // }
})

let status = false
let userExist = false
let id = 5

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
                // emailaddress: emailaddress
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
    console.log('\n', req.body)

    // on ajoute ces informations dans la base de donnees (on cree un nouvel utilisateur avec ces informations)
    createUser(username, password, phonenumber, emailaddress)

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