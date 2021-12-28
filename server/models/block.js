const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    prevHash: {
        require: true,
        type: String
    },
    hash: {
        require: true,
        type: String
    }, user: {
        require: false,
        type: String
    }
});

module.exports = new mongoose.model("Block", BlockSchema);