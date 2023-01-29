const {Sequelize, DataTypes} = require('sequelize')
const variable = require('../variables/Variables')
const md5 = require("md5")
const UserModel = require('../modele/user.model')

const User = UserModel.User

const sequelize = UserModel.sequelize


sequelize.authenticate()
    .then(()=>{
        console.log('Connection a la BD reussie')
    })
    .catch((error)=>{
        console.error('Impossible d\'etablir la connexion')
    })


sequelize.sync().then(()=>{
    
    User.findAll().then((res)=>{
        console.log(res)
    }).catch((error)=>{
        console.error("Echec de recherche des utilisateurs", error)
    })


   


}).catch((error)=>{
    console.error('Impossible de creer cette table')
})

let CreateUser = (username, password, phonenumber, emailaddress) =>{
    sequelize.sync().then(()=>{
        User.create({
            username: username,
            password: password,
            phonenumber: phonenumber,
            emailaddress: emailaddress
        }).then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.error("Echec de creation de l'utilisateur", error)
        })
     
    }).catch((error)=>{
        console.error('Impossible de creer cette table')
    })
}

let FindAllUsers = ()=>{
    sequelize.sync().then(()=>{
        User.findAll().then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.error("Echec de recherche des utilisateurs", error)
        })
    
    }).catch((error)=>{
        console.error('Impossible de creer cette table')
    })
}

let FindUserByID = () =>{
    
}

let FindUserByUserName = () =>{
    
}

let UpdateUser = () =>{

}

let DeleteUser = () =>{

}


module.exports = {CreateUser, FindAllUsers, FindUserByID, FindUserByUserName, UpdateUser, DeleteUser}
