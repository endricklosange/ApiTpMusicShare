const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Session = new Schema({
    module_name: {
        type: String,
        required: true
    },
    expiration_date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('VotingSession', Session);
