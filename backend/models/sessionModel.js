const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Session = new Schema({
    module_name: {
        type: String,
        required: true
    },
    expiration_date: {
        type: Date,
    }
});

// Fonction pour définir automatiquement la date d'expiration à 2 jours à partir de maintenant
Session.pre('save', function (next) {
    const currentDate = new Date();
    this.expiration_date = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000); // Ajoute 2 jours en millisecondes
    next();
});

module.exports = mongoose.model('VotingSession', Session);
