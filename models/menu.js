var mongoose = require('mongoose');

var MenuItem = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    ratingTotal: { type: Number, default: 0 },
    numRatings: { type: Number, default: 0 }
})

module.exports = mongoose.model('MenuItem', MenuItem);