const express = require('express')
const routerContacts = express.Router();


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


//sequelize.close() // pour fermer la connexion 127.0.0.1:3000/save-contact


// Endpoint pour sauvegarder un contact
routerContacts.post('/save', (req, res) => {
    Contact.create({
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        iduser: req.body.iduser,
    }).then((contact) => {
        res.status(200).json(contact);
    }).catch((error) => {
        res.status(400).json(error);
    });
});

// Endpoint pour récupérer un contact
routerContacts.get('/:id', (req, res) => {
    Contact.findByPk(req.params.id)
        .then((contact) => {
            if (!contact) {
                res.status(404).json({ message: "Contact Not Found" });
            }
            res.status(200).json(contact);
        }).catch((error) => {
            res.status(400).json(error);
        });
});

module.exports = routerContacts