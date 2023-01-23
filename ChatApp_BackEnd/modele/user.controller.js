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
    console.log('Table user cree avec succes')


    // Insertion d'un element dans une table
     User.create({
       username: 'myriam',
        password: '00000000',
        phonenumber: 699546198
     }).then((res)=>{
         console.log(res)
     }).catch((error)=>{
        console.error("Echec de creation de l'utilisateur", error)
     })


    // Selectionner tous les utilisateurs
    User.findAll().then((res)=>{
        console.log(res)
    }).catch((error)=>{
        console.error("Echec de recherche des utilisateurs", error)
    })


    // Selectionner un utilisateur en particulier avec son id
    // User.findOne({
    //     where: {
    //         id: '2'
    //     }
    // }).then((res)=>{
    //     console.log(res)
    // }).catch((error)=>{
    //     console.error("Echec de recherche des utilisateurs", error)
    // })

    // Selectionner un utilisateur en particulier avec son username et password
    // User.findOne({
    //     where: {
    //         username: 'lening',
    //         password: 'helloworld'
    //     }
    // }).then((res)=>{
    //     console.log(res)
    // }).catch((error)=>{
    //     console.error("Echec de recherche des utilisateurs", error)
    // })


}).catch((error)=>{
    console.error('Impossible de creer cette table')
})


//Exportation des tables, pour pouvoir les utiliser dans les autres fichiers
module.exports = {
    User,
    SMS,
    Contact
}