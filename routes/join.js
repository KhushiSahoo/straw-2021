const express = require('express');
const router= express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Volunteer = require('../models/join');

///join
//join/post/form
router.get('/Join' , catchAsync(async(req,res)=>{
    res.render('join/index');
}))
 

 router.post('/Join' , catchAsync(async(req , res)=>{
    if(!req.body) throw new ExpressError("Invalid form Data" , 400);
   
     const newVolunteer = new Volunteer(req.body);
     await newVolunteer.save();
     //console.log(req.body)
     req.flash('success' , 'Successfully registered you in Volunteer Program!')
     res.redirect(`/Join`);
    
 }))

 router.get('/Join/new' , (req, res) =>{
    res.render('join/new');
})

 
 module.exports = router;