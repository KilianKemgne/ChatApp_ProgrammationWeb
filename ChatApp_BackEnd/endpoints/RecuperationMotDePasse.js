
const express = require('express')
const router = express.Router()
const variable = require('../variables/Variables')


router.post('/', (req, res, next)=>{
    // on recupere le corps de la requete post
    let phonenumber = req.body.phonenumber
    console.log('\n', req.body)

    // on recupere les informations correspondant de la base de donnees
    
    // on renvoie le resultat de la requete au client
    if(phonenumber == 677702526/*si l'utilisateur existe*/){
        // on met a jour le mot de passe
        let id = 1
        let password = 'xyzt' 
        let username = 'kenne'
        // on met la novelle valeur dans la BD

        //on renvoi le resultat
        res.send({'id': id, 'username': username, 'password':password, 'phonenumber': phonenumber})
    }
    else{
        //on retourne une erreur
        console.log('Identifiants incorrectes')
    }

})

module.exports = router