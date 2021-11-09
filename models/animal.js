const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const animalSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    category:{
        type: String,
        lowercase:true,
        enum:['dog' , 'cat']
    },
    age:{
        type: Number,
        min:0,
        required: true,

    },
    images:[
        {
            url: String,
            filename:String,
 
        }
     ],
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
     },
    location:{
        type: String,
        required: true,
    },
    info:{
        type: String,

    },
    gender:{
        type: String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    breed:{
        type:String,
        required: true,
    }
});

const Animal = mongoose.model('Animal' , animalSchema );
module.exports = Animal;