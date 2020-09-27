const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    level:{
       type: Number,
       default: 1
    },
    scores:{
        type: Number,
        default: 0
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Player = mongoose.model("player", PlayerSchema);