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

const SMS = sequelize.define("sms",{
    content:{
        type: DataTypes.STRING,
        allowNull: true
    },
    creationdate:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    iduser:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idcontact:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const Contact = sequelize.define("contacts",{
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phonenumber:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    iduser:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

sequelize.sync().then(()=>{
    console.log('Toutes les Tables ont ete crees avec succes')
}).catch((error)=>{
    console.error('Impossible de creer cette table')
})


//sequelize.close() // pour fermer la connexion

