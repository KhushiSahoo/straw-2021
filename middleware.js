const Blog = require('./models/blog');
const Comment = require('./models/comment');
const Animal = require('./models/animal');


module.exports.isLoggedIn = (req,res,next)=>{
    //console.log("REQ.USER..." , req.user);
    //store the url they are requesting
    //console.log(req.path , req.originalUrl);
    req.session.returnTo= req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash('error' , 'You must be signed in');
        return res.redirect('/Login');
    }
    next();
}
//passport+session->serialized deserialized 
//req.user  contains info abt user stored in session
//will be filled wid deserialized info from the session

//authorization middleware
module.exports.isAuthor = async(req,res,next)=>{
    const {id}= req.params;
    const blog = await Blog.findById(id);
      //authorization check
    if( !blog.author.equals(req.user._id)){
       req.flash('error' , 'You dont have permission to do that');
      return  res.redirect(`/Blog/${id}`);
    } 
    next();
}


//adopt author 
module.exports.isAnimalAuthor = async(req,res,next)=>{
  const {id}= req.params;
  const animal = await Animal.findById(id);
    //authorization check
  if( !animal.author.equals(req.user._id)){
     req.flash('error' , 'You dont have permission to do that');
    return  res.redirect(`/Adopt/${id}`);
  } 
  next();
}






// /Blog/id/comments/commentId
module.exports.isCommentAuthor = async(req,res,next)=>{
  const {id , commentId}= req.params;
  const comment = await Comment.findById(commentId);
    //authorization check
  if( !comment.author.equals(req.user._id)){
     req.flash('error' , 'You dont have permission to do that');
    return  res.redirect(`/Blog/${id}`);
  } 
  next();
}