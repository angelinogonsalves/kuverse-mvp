const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
    address: {type: String, lowercase: true},
    owner: {type: String, lowercase: true}, //address of the owner
    name: String,
    uri: String,
    isPublic: {type: Boolean, default: false},
    timestamp: {type: Number, index: true},
});

module.exports.Collection = mongoose.model('collections', CollectionSchema);
