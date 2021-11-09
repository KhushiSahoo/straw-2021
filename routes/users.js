const express = require('express');
const router= express.Router();
const passport= require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');


router.get('/Register' , (req , res)=>{
    res.render('user/register');
})
router.post('/Register' , catchAsync(async(req , res , next)=>{
    try{
        const {email , username , password}=req.body;
        const user= new User({email , username});
       const registeredUser = await User.register(user, password); //hash password stores salt and password on a new user
       req.login(registeredUser , err =>{  //req.login ->passport
           if(err) return next(err);
          // console.log(registeredUser);
           req.flash('success' , 'Welcome !');
           res.redirect('/Adopt');
       })
       
    }catch(e){
        req.flash('error' , e.message);
        res.redirect('/Register');
    }
   
}));

router.get('/Login', (req, res)=>{
   res.render('user/login');
})

//passport authentication middleware
 router.post('/Login' , passport.authenticate('local' ,{failureFlash: true , failureRedirect: '/Login'}) ,(req, res)=>{
     req.flash('success' , "Welcome Back!");
     const redirectUrl= req.session.returnTo || '/Adopt';
     res.redirect(redirectUrl);
 })

 //passport logout
 router.get('/Logout' , (req , res)=>{
     req.logout();
     req.flash('success' , "Goodbye");
     res.redirect('/Adopt');
 })

module.exports = router;