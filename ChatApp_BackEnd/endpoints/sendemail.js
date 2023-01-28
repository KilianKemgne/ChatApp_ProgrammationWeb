// A continuer pour envoyer un mail

let nodeoutlook = require('nodejs-nodemailer-outlook')

function SendEmail (receiver, code){
    nodeoutlook.sendEmail({
        auth: {
            user: "stevelening@outlook.fr",
            pass: "Mars2002"
        },
        from: 'stevelening@outlook.fr',
        to: receiver,
        subject: 'Code de validation',
        text: 'Votre code de validation est : '+code,
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    })
}

// testons la methode SendEmail
// SendEmail('micheltalaupa@gmail.com', '5462')

module.exports = SendEmail
 