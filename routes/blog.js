const express = require('express');
const router= express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Blog = require('../models/blog');
const Comment = require('../models/comment')
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

const {isLoggedIn}= require('../middleware');
const {isAuthor}= require('../middleware');


router.get('/' , catchAsync(async(req , res)=>{
    const blogs = await Blog.find({}).populate('author');
    res.render('blog/index' , {blogs})
 }))
 
 router.get('/new' , isLoggedIn, (req, res) =>{
     res.render('blog/new');
 })
 //req.files fom multer
 router.post('/' , isLoggedIn, upload.array('image') ,catchAsync(async(req , res)=>{
     if(!req.body) throw new ExpressError("Invalid form Data" , 400);
     
     const newBlog = new Blog(req.body);
     newBlog.images= req.files.map(f =>({
        url: f.path,
        filename: f.filename
    }))
     newBlog.author=req.user._id;
     await newBlog.save();
     //console.log(req.body);
    // console.log(newBlog); 
     req.flash('success' , 'Successfully added your entry!');
     res.redirect(`/Blog/${newBlog._id}`)
    
 }))
 router.get('/:id' , catchAsync(async(req , res)=>{
    // const blog = await Blog.findById(req.params.id).populate('comments').populate('author');
    const blog = await Blog.findById(req.params.id).populate({
        path:'comments',
        populate:{
            path:'author'
        }
     }).populate('author');//nested populate
    // console.log(blog);
     if(!blog){
        req.flash('error' , 'Cannot find the post');
        return res.redirect('/Blog');
    }
    res.render('blog/show' , {blog});
  }))
 
  router.get('/:id/edit' , isLoggedIn, isAuthor, catchAsync(async(req , res)=>{
    const blog = await Blog.findById(req.params.id).populate({
        path:'comments',
        populate:{
            path:'author'
        }
     }).populate('author');//nested populate
     if(!blog){
        req.flash('error' , 'Cannot find the post');
        return res.redirect('/Blog');
    }
    //console.log(blog);
     res.render('blog/edit' , {blog});
  } ))
 
  router.put('/:id' , isLoggedIn ,isAuthor , upload.array('image'), catchAsync(async(req , res)=>{
    const {id} = req.params;
      const blogfind = await Blog.findByIdAndUpdate(id , req.body , {runValidators:true , new:true})
      const imgs = req.files.map(f =>({
        url: f.path,
        filename: f.filename
    }))
      blogfind.images.push(...imgs);
    await blogfind.save();
      req.flash('success' , "Successfully updated your entry !")
      res.redirect(`/Blog/${blogfind._id}`);
  }))
  
  router.delete('/:id' , isLoggedIn ,isAuthor, catchAsync(async(req,res)=>{
     const {id} = req.params;
     const deletedBlog = await Blog.findByIdAndDelete(id);
     req.flash('success' , 'Successfully deleted your entry');
     res.redirect('/Blog');
 
 }))

 module.exports = router;