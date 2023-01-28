
const express = require("express")
const variable = require('./variables/Variables')
const routerConnexion = require('./endpoints/Connexion')
const routerInscription = require('./endpoints/Inscription')
const routerForgotPassword = require('./endpoints/RecuperationMotDePasse')
const routerPublic = require('./endpoints/Public')
// const routerSMS = require('./endpoints/EnvoiSMS')
const routerMessages = require('./endpoints/SauvegardeRecuperationMessages')
const routerContacts = require('./endpoints/SauvegardeRecuperationContacts')
const verifyCode = require('./endpoints/Verifycode')
const userProfile = require('./endpoints/Userprofile')
const updateUser = require('./endpoints/Updateuser')
const updateUserPassword = require('./endpoints/UpdateuserPassword')
const numberMessagesContacts = require('./endpoints/NumberMessagesContacts')

const app = express()

const port = variable.PORT
const host = variable.HOST

// pour permettre des requetes venants de sources inconnues
const cors = require('cors');
app.use(cors());

// pour les requetes post (on doit utiliser le middleware pour la gestion des json)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))


// Debut gestion de la session (OK)
const session = require('express-session');

const oneDay = 1000 * 60 * 60 * 24; // la session est automatiquement detruite au bout de 24h
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false,
}));

// Fin gestion de la session

// definissons nos routes
app.use('/', routerPublic) // exposition du endpoint public (the home page)
app.use('/connexion', routerConnexion) // exposition du endpoint connexion
app.use('/inscription', routerInscription) // exposition du endpoint d'inscription
app.use('/forgot-password', routerForgotPassword) // exposition du endpoint de mot de passe oubie
// app.use('/sms', routerSMS) // exposition du endpoint d'envoi de sms
app.use('/messages', routerMessages) // exposition du endpoint de sauvegarde et de recuperation de messages
app.use('/contacts', routerContacts) // exposition du endpoint de sauvegarde et de recuperation de contacts
app.use('/verifycode', verifyCode) // endpoint to verify the code
app.use('/userprofile', userProfile) // endpoint to get the profile of a specific user 
app.use('/updateuser', updateUser) // endpoint to update user informations
app.use('/updateuserpassword', updateUserPassword)
app.use('/numbermessagescontacts', numberMessagesContacts) 

app.get('/deconnexion', async (req, res, next)=>{
    // on detruit la session et on va a l'acceuil (/)
    await req.session.destroy()
    console.log('Deconnexion reussi')
    console.log('req.session:', req.session)
    res.send({});
})


app.listen(port, ()=>{
    console.log(`Server running on http://${host}:${port}`)
})