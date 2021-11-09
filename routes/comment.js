const express = require('express');
const router= express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const {isLoggedIn , isCommentAuthor}=require('../middleware');
const Blog = require('../models/blog');
const Comment = require('../models/comment')



router.post('/' , isLoggedIn ,catchAsync(async(req,res)=>{
    
    const blog = await Blog.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    blog.comments.push(comment);
    await comment.save();
    await blog.save();
    req.flash('success' , 'Created new comment');
    res.redirect(`/Blog/${blog._id}`);
     //res.send("You made it")
 }))

 router.delete('/:commentId' , isLoggedIn, isCommentAuthor,  catchAsync(async(req,res)=>{
     const {id , commentId} = req.params;
     const blog = await Blog.findByIdAndUpdate(id ,{$pull: {comments: commentId}});
     req.flash('success' , 'Successfully deleted your comment');
     await Comment.findByIdAndDelete(commentId);
     res.redirect(`/Blog/${blog._id}`)
 }))

 module.exports = router;