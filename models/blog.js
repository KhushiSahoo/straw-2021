const mongoose = require('mongoose');
const Comment = require('./comment');
const User = require('./user');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        required:true,
        /*enum:['dog' , 'cat' , 'bird', 'rabbit' , 'fish' , 'reptile' , 'others']*/
    },
   
    images:[
       {
           url: String,
           filename:String,

       }
    ],
    
    info:{
        type: String,
        required : true,

    },
    author:{
       type: Schema.Types.ObjectId,
       ref: 'User',
    },
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});
blogSchema.post('findOneAndDelete' , async function(doc){
    if(doc){
        await Comment.deleteMany({
            _id:{
             $in: doc.comments
            }
        })
    }
})
const Blog = mongoose.model('Blog' , blogSchema );
module.exports = Blog;