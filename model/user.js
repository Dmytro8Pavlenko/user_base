const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    'first_name': {
        type: String,
        required: true,
    },
    'last_naame ': {
        type: String,
        required: true,
    },
    'middle_name': {
        type: String,
        required: true,
    },
    'date_of_birth': {
        type: Date,
        required: true,
    },
    'salary': {
        type: Number,
        required: true,
    },
    'department': {
        type: String,
        required: true,
    },
    'profession': {
        type: String,
        required: true,
    },
});

exports.User = mongoose.model('User', schema);