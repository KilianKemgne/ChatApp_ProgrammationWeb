
const express = require('express')
const router = express.Router()
const variable = require('../variables/Variables')


router.post('/', (req, res, next)=>{
    // on recupere le corps de la requete post
    let username = req.body.username
    let password = req.body.password
    let phonenumber = req.body.phonenumber
    console.log('\n', req.body)

    // on ajoute ces informations dans la base de donnees (on cree un nouvel utilisateur avec ces informations)
    // on verifie d'abord qu'un utilisateur ayant ces identifiants (username, password) n'existe pas dans la BD
    let id = 1

    // on renvoie le resultat de la requete au client
    if(username == 'steve'/*si l'utilisateur a ete cree avec success*/){
        //on renvoi le resultat (on ne lui envoi pas le password)
        res.send({'id': id, 'username': username, 'phonenumber': phonenumber})
    }
    else{// si l'utilisateur existe deja
        //on retourne une erreur
        throw new Error('Utilisateur existant')
    }

})

module.exports = router