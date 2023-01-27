const {Sequelize, DataTypes} = require('sequelize')
const variable = require('../variables/Variables')
const CodeModel = require('../modele/code.model')

const Code = CodeModel.Code

const sequelize = CodeModel.sequelize

let CreateCode = (code) =>{
    sequelize.sync().then(()=>{
        Code.create({
            code: code,
        }).then((res)=>{
            console.log('Creation de code ok\n', res)
        }).catch((error)=>{
            console.error("Echec de creation de l'utilisateur", error)
        })
     
    }).catch((error)=>{
        console.error('Impossible de creer cette table (code)')
    })
}

let DeleteCode = (code) =>{
    sequelize.sync().then(()=>{
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

let CheckCode = (code) =>{
    let status = false
    sequelize.sync().then(()=>{
        Code.findOne({
            where: {
                code: code
            }
        }).then((res)=>{
            console.log('on entre ici !')
            status = true
            console.log('status :', true)
            return true
        }).catch((error)=>{
            console.error("Echec de recherche des utilisateurs", error)
        })
    }).catch((error)=>{
        console.error('Impossible d\'acceder a la table')
    })
   
}

module.exports = {CreateCode, DeleteCode, CheckCode}