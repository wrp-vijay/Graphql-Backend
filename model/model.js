const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    country: String
});

const user = mongoose.model('user',userSchema);
module.exports = user;