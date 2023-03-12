const mongoose = require('mongoose');
const codeMaker = require('../utils/codeMaker');

const smartCanSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        default: () => `Smart Can ${codeMaker(8)}`
    },
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