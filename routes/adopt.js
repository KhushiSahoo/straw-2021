const express = require('express');
const router= express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Animal = require('../models/animal');
//authentication and authorization middleware
const {isLoggedIn}= require('../middleware');
const {isAnimalAuthor}= require('../middleware');
//image associated
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.get('/' , catchAsync(async(req , res)=>{
    const {category} = req.query;
    if(category){
        const animals = await Animal.find({category:category}).populate('author');
        res.render('adopt/index' , {animals , category})
    }else{
        const animals = await Animal.find({}).populate('author');
    res.render('adopt/index' , {animals , category:'Animal'})
    }

    
 }))
 
 router.get('/new' , isLoggedIn, (req, res) =>{
     res.render('adopt/new');
 })
 //req.files from muter
 router.post('/' , isLoggedIn, upload.array('image'), catchAsync(async(req , res)=>{
    if(!req.body) throw new ExpressError("Invalid form Data" , 400);
   
     const newAnimal = new Animal(req.body);
     newAnimal.images= req.files.map(f =>({
        url: f.path,
        filename: f.filename
    }))
     newAnimal.author=req.user._id;
     await newAnimal.save();
     //console.log(newAnimal);
     req.flash('success' , 'Successfully added your entry!')
     res.redirect(`/Adopt/${newAnimal._id}`)
    
 }))
 router.get('/:id' , catchAsync(async(req , res)=>{
     const animal = await Animal.findById(req.params.id).populate('author');
     ///console.log(animal);
     if(!animal){
         req.flash('error' , 'Cannot find the post');
         return res.redirect('/Adopt');
     }
    res.render('adopt/show' , {animal});
  }))
 
  router.get('/:id/edit' , isLoggedIn, isAnimalAuthor, catchAsync(async(req , res)=>{
     const animal = await Animal.findById(req.params.id).populate('author');
     if(!animal){
        req.flash('error' , 'Cannot find the post');
        return res.redirect('/Adopt');
    }
     res.render('adopt/edit' , {animal});
  } ))

  router.get('/:id/contact' , catchAsync(async(req,res)=>{
      res.render('adopt/contact');
  }))
 
  router.put('/:id' ,isLoggedIn, isAnimalAuthor, upload.array('image'), catchAsync(async(req , res)=>{
      const {id}= req.params;
      const animal = await Animal.findByIdAndUpdate(id , req.body , {runValidators:true , new:true})
      const imgs = req.files.map(f =>({
        url: f.path,
        filename: f.filename
    }))
      animal.images.push(...imgs);
      await animal.save();
      req.flash('success' , "Successfully updated our entry !")
      res.redirect(`/Adopt/${animal._id}`)
  }))
  
  router.delete('/:id' ,isLoggedIn, isAnimalAuthor, catchAsync(async(req,res)=>{
     const {id} = req.params;
     const deletedAnimal = await Animal.findByIdAndDelete(id);
     req.flash('success' , 'Successfully deleted your entry');
     res.redirect('/Adopt');
 
 }))

 module.exports = router;