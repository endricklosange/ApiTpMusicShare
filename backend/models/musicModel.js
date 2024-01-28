const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let musicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    music_url: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Music', musicSchema);
