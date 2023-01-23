const {Contact, sequelize} = require('./user.model')

// Fonction pour récupérer tous les contacts
exports.findAll = (req, res) => {
    Contact.findAll().then(contacts => {
        // envoie de tous les contacts au client
        res.send(contacts);
    }).catch((error) => {
        console.error("Echec de recherche des contacts", error)
    });
};

// Fonction pour créer un nouveau contact
exports.create = (req, res) => {
    Contact.create({
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        iduser: req.body.iduser,
    }).then((contact) => {
        res.status(200).json(contact);
    }).catch((error) => {
        res.status(400).json(error);
    });
};

// Fonction pour récupérer un contact par ID
exports.findOne = (req, res) => {
    Contact.findByPk(req.params.id)
        .then((contact) => {
            if (!contact) {
                res.status(404).json({ message: "Contact Not Found" });
            }
            res.status(200).json(contact);
        }).catch((error) => {
            res.status(400).json(error);
        });
};

// Fonction pour mettre à jour un contact par ID
exports.update = (req, res) => {
    Contact.update({
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        iduser: req.body.iduser,
    }, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).json({ message: "Contact updated successfully" });
    }).catch((error) => {
        res.status(400).json(error);
    });
};

// Fonction pour supprimer un contact par ID
exports.delete = (req, res) => {
    Contact.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).json({ message: "Contact deleted successfully" });
    }).catch((error) => {
        res.status(400).json(error);
    });
};


