
const express = require("express")
const variable = require('./variables/Variables')
const routerConnexion = require('./endpoints/Connexion')
const routerInscription = require('./endpoints/Inscription')
const routerForgotPassword = require('./endpoints/RecuperationMotDePasse')
const routerPublic = require('./endpoints/Public')
const routerSMS = require('./endpoints/EnvoiSMS')
const routerMessages = require('./endpoints/SauvegardeRecuperationMessages')
const routerContacts = require('./endpoints/SauvegardeRecuperationContacts')

const app = express()

const port = variable.PORT
const host = variable.HOST

// pour permettre des requetes venants de sources inconnues
var cors = require('cors');
app.use(cors());

// pour les requetes post (on doit utiliser le middleware pour la gestion des json)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))


// gestion de la session (OK)
const cookieParser = require("cookie-parser");
const session = require('express-session');

const oneDay = 1000 * 60 * 60 * 24; // la session est automatiquement detruite au bout de 24h
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
// cookie parser middleware
app.use(cookieParser());


// definissons nos routes
app.use('/', routerPublic) // exposition du endpoint public 
app.use('/connexion', routerConnexion) // exposition du endpoint connexion
app.use('/inscription', routerInscription) // exposition du endpoint d'inscription
app.use('/forgot-password', routerForgotPassword) // exposition du endpoint de mot de passe oubie
app.use('/sms', routerSMS) // exposition du endpoint d'envoi de sms
app.use('/messages', routerMessages) // exposition du endpoint de sauvegarde et de recuperation de messages
app.use('/contacts', routerContacts) // exposition du endpoint de sauvegarde et de recuperation de contacts

app.get('/deconnexion', (req, res, next)=>{
    // on detruit la session et on va a l'acceuil (/)
    res.redirect('/');
})


app.listen(port, ()=>{
    console.log(`Server running on http://${host}:${port}`)
})