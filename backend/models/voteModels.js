const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let voteSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    music_id: {
        type: Schema.Types.ObjectId,
        ref: 'Music',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    vote_date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Vote', voteSchema);
