const mongoose = require('mongoose');

const smartCanSchema = new mongoose.Schema({
    is_full: {
        type: Boolean,
        required: true,
        default: false
    },
    owner_id: {
        type: [String],
        ref: "users",
        required: true,
        default: []
    }
})

module.exports = mongoose.model('smartcans', smartCanSchema);