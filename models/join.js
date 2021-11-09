const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const volunteerSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true,
        /*enum:['dog' , 'cat' , 'bird', 'rabbit' , 'fish' , 'reptile' , 'others']*/
    },
    age:{
        type: Number,
        min:0,
        required: true,

    },
    pincode:{
       type: Number,
       required: true,
    },
    email:{
        type: String,
        required:true,
    },
    phone:{
        type: Number,
        min:10,
        required: true,
    },
    skill:{
     type:String,
    },
    status:{
      type: String,
      enum:['student' , 'homemaker' , 'employed' , 'other' ],
    },
    
    agree:{
        type: String,
        required:true,
    }
    
});

const Volunteer = mongoose.model('Volunteer' , volunteerSchema );
module.exports = Volunteer;