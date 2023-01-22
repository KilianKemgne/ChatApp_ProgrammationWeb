
const express = require('express')
const router = express.Router()
const variable = require('../variables/Variables')


router.post('/', (req, res, next)=>{
    // on recupere le corps de la requete post
    let username = req.body.username
    let phonenumber = req.body.phonenumber
    console.log('\n', req.body)

    // on recupere les informations correspondant de la base de donnees
    

    // on renvoie le resultat de la requete au client
    if(username == 'steve'/*si l'utilisateur existe*/){
        // on met a jour le mot de passe
        let id = 1
        let password = 'xyzt' 
        // on met la novelle valeur dans la BD

        //on renvoi le resultat
        res.send({'id': id, 'username': username, 'password':password, 'phonenumber': phonenumber})
    }
    else{
        //on retourne une erreur
        throw new Error('Identifiants incorrectes')
    }

})

module.exports = router