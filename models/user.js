const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    }
});
//passport-local-mongoose will add a username , hash and salt field to store username
UserSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User', UserSchema);