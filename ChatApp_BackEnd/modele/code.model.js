const {Sequelize, DataTypes} = require('sequelize')
const variable = require('../variables/Variables')

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

const Code = sequelize.define("code",{
    code:{
        type: DataTypes.STRING,
        allowNull: false
    },
})

sequelize.sync().then(async ()=>{
    console.log('Table code cree avec succes')
}).catch((error)=>{
    console.error('Impossible de creer cette table')
})

module.exports = {Code, sequelize}

