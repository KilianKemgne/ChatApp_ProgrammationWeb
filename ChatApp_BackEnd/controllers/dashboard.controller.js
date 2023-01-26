const {SMS, sequelize} = require('../modele/sms.model')
const {Sequelize, DataTypes} = require('sequelize')
const variable = require('../variables/Variables')
const {User, sequelize} = require('../modele/user.model')


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

sequelize.authenticate()
    .then(()=>{
        console.log('Connection a la BD reussie')
    })
    .catch((error)=>{
        console.error('Impossible d\'etablir la connexion')
    })

    
    User.findAll().then((res)=>{
        console.log(res)
    }).catch((error)=>{
        console.error("Echec de recherche des utilisateurs", error)
    })



exports.findAll = (req, res) => {
    SMS.findAll().then(sms => {
        res.send(sms);
        console.log(sms)
    }).catch((error)=>{
        console.error("Echec de recherche des sms", error)
    })
    ;
}