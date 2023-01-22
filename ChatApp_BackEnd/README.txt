pour lancer le statercode du backend, il faut suivre la procedure suivante :

- Cloner le depot git du projet si c'est pas encore fait (si c'est deja fait, alors faites un "git pull" pour avoir les dernieres mis a jours)
- Ouvrir le projet avec VScode et se positionner dans le dossier ./back-end
- Executer la commande "npm install" pour installer les dependances
- Creer la Base de donnees sur votre pc dont le nom est : "parrotdb"
- Aller dans le fichier ./back-end/variables/Variables.js et mettre les informations de votre BD
- Executer le fichier user.model.js ( en fesant "node user.model.js") pour creer les tables de la BD (ce fichier se trouve dans ./back-end/modele/user.model.js)
- Jetter un coup d'oiel au fichier user.controller.js du mm dossier pour voir comment inserer et recuperer les elements dans une BD en utilisant sequelize
- Vous etes pret a demarer votre enpoint, n'hesitez pas a utiliser postman pour tester vos endpoints
- Bonne chance !

NB: Me contacter en cas de difficultes (ou d'incomprehension du readme.txt)