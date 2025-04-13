const mongoose = require('mongoose');

const BackpackCard = new mongoose.Schema({
    sId: String,  // account address - backpack id
    backpackId: Number,
    slotModels: Array,
    slotIds: Array,
    timestamp: Number,  // epoch time
});
BackpackCard.index({sId: 1, backpackId: 1, timestamp: 1});
module.exports.BackpackCard = mongoose.model('backpack_cards', BackpackCard);
