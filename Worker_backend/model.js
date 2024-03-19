const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:Number,
    name:String,

    number:String,
    email:String,
    address:String,
    license:String,
    username:String,
    password:String,
});

const User = mongoose.model('User', userSchema)

module.exports = User;