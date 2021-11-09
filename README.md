
# Straw
Straw is a **Node.js** web application where users can log in, post, view, edit and delete animal information , create blogs and comments, and make donation (payment) through integrated razorpay payment gateway .  
  
Online Demo: https://straww-2021.herokuapp.com/  


* Implemented back-end services as **RESTful APIs** using **Express**
* Built and connected to **MongoDB** by Mongoose to store user , animals and blogs data, and execute the related CRUD operation
* Created dynamic HTML with **EJS** templating
* Handled user authentication and authorization through **Passport.js**
* Used **session** to store data and send cookies
* Styled front-end interface by **Bootstrap** and CSS
* Deployed on **Heroku** and **MongoDB Atlas**

## Getting Started  
### Prerequisites
* [Node.js](https://nodejs.org/en/) for running server-side JavaScript.  
* [MongoDB](https://www.mongodb.com/3) to store data.  
* [Cloudinary](https://cloudinary.com/) to store images.  
* [Razorpay](https://razorpay.com//) for payment gateway.

### Installing
1. Clone the repo and install dependencies
```
git clone 
npm install
```
2. Create a `.env` file in the root of the project and add the following (replace the contents in brackets with yours)
```
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_KEY=<key>
CLOUDINARY_SECRET=<secret>
RAZORPAY_KEY_ID=<key>
RAZORPAY_KEY_SECRET=<key>
DB_URL=<url>
```
3. Start local server
```
npm start
// or
node app.js
```
4. Open your web browser and visit the address `localhost:3000`