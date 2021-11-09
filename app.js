const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const catchAsync = require('./utils/catchAsync');
const Animal = require('./models/animal');
const Blog = require('./models/blog');
const Comment = require('./models/comment')

const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

require('dotenv').config();


//adding routes
const users = require('./routes/users');
const adopts = require('./routes/adopt')
const blog = require('./routes/blog')
const comment = require('./routes/comment')
const join = require('./routes/join');
const donate = require('./routes/index');
const paymentWebRoutes = require('./routes/payments');

//connecting with mongo
const dbUrl = process.env.DB_URL
//'mongodb://localhost:27017/pawws'
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
  console.log("connection open");
}


const app = express();
const path = require('path');

app.engine('ejs' , ejsMate)
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views') );
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname , 'public')))


app.use(session({
    store: MongoStore.create({
         mongoUrl:dbUrl ,
         crypto: {
            secret:'Thisshouldbebetterasecret'
          },
         ttl: 14 * 24 * 60 * 60 // = 14 days. Default
   }),
   secret:'Thisshouldbebetterasecret',
    resave:false,
    saveUninitialized:true,
    httpOnly:true,
    cookie:{
        expires: Date.now() + 1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
    }
  }));

app.use(flash());

//passport after configuiring session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//authenticates() generates a function that is used in passport LocalStrategy;
passport.serializeUser(User.serializeUser());//how to strore and unstrore in session
passport.deserializeUser(User.deserializeUser())

//flash middleware
app.use((req,res,next) =>{
   // console.log(req.session);
   res.locals.currentUser = req.user; 
   res.locals.success= req.flash('success');
   res.locals.error= req.flash('error');
   next();

})

//routes
app.use('/' , donate);
app.use('/payment', paymentWebRoutes);
app.use('/' , users);
app.use('/Adopt' , adopts);
app.use('/Blog' , blog);
app.use('/Blog/:id/comments', comment)
app.use('/' , join);

app.get('/' , catchAsync(async(req , res)=>{
const animals = await Animal.find({}).populate('author');
const blogs = await Blog.find({}).populate('author');
res.render('home' , {animals , blogs})
}))



app.all('*' , (res , req , next)=>{
    next(new ExpressError("Page not Found" , 404))
})

app.use((err , req , res , next)=>{
  const {statusCode = 500 , message="Something went wrong" } = err;
  if(!err.message)err.message ="Oh No! Something went wrong :("
  res.status(statusCode).render('error' , {err});
})


//listen on port 3000
const port =  process.env.PORT || 3000 ;
app.listen(process.env.PORT || 3000 , ()=>{
  console.log(`listening on port ${port}`)
})
