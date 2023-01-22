
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
    }
})

let username
let password
let id
let phonenumber

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
    username = req.body.username
    password = req.body.password
    console.log('\n', req.body)
 
    // on verifie si cet utilisateur existe dans la BD
    checkUser(username, password)

    // on renvoie le resultat de la requete au client
    setTimeout(()=>{
        // on va juste patienter 50 millisecondes pour que le resultat de la requete soit disponible
        if(id == undefined || phonenumber == undefined){
            //on retourne une erreur
            res.send({})// on renvoi une erreur
        }
        else{
            //on renvoi le resultat (on ne lui envoi pas le password)
            res.send({'id': id, 'username': username, 'phonenumber': phonenumber})
        }
    }, 50)

})

module.exports = router