// require('dotenv').config();
// const express = require('express')
// const app = express()
// const bcrypt = require('bcrypt')
// const methodOverride = require('method-override')
// const jwt = require ('jsonwebtoken')
// const bodyParser = require("body-parser");
// const JWT_Secret = process.env.JWT_SECRET;
// const JWT_Refresh = process.env.REFRESH_JWT_SECRET;




//require mongoose-translates Node.js
// const mongoose = require ("mongoose");
// mongoose.set('useFindAndModify', false);
//returns object AFTER update was applied
// mongoose.set('returnOriginal', false);

//call in schema models
// var User = require ("./models/userDatabase.js");

//add path library
// const path = require("path");
// const { response } = require('express');
// const { default: jwtDecode } = require('jwt-decode');

//declare port to connect t0
// const port = 3000;

//connect to Atlas cluster
// const mongoLogIn = process.env.mongoInfo
// const mongoDB = 'mongodb+srv://'+ mongoLogIn;

//accessing the connect method of mongoose
//pass it the name of the DB cluster we have created
//mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,}, (err, client) => {
//     if(err) return console.error(err);
//     console.log('Connected to database');
//     });
// const db = mongoose.connection;

//turns on the connection
// db.on('error', console.error.bind(console, 'connection error:'));


//use the following middleware
app.use(
    //middleware for delivering static files
    express.static(
        //uses path library to take care of relative paths
        path.join(__dirname, 'public')));


// app.use(express.urlencoded({ extended: false}))
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(methodOverride('_method'))
// app.use(express.json())



//!   USER SELF REGISTER
//!   USER SELF REGISTER
//!   USER SELF REGISTER
//!   USER SELF REGISTER

// app.post('/register', async (req, res) =>{
//     console.log(req.body)
//     var email = req.body.email

//     if((!req.body.name || typeof req.body.name != 'string')){
//         return res.json({status: 'error', error: 'Invalid name - name is a required field'})
//     }

//     if((!req.body.email || typeof req.body.email != 'string')){
//         return res.json({status: 'error', error: 'Invalid email - email is a required field.'})
//     }

//     const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//     if (email.match(mailFormat)===null){ 
//         return res.json({status: 'error', error: "You have entered an invalid email address!"})
//     }

//     if ((!req.body.phone || typeof req.body.phone != 'string')){
//         return res.json({status: 'error', error: 'Invalid phone - phone is a required field.'})
//     }

//     if((!req.body.password || typeof req.body.password != 'string')){
//         return res.json({status: 'error', error: 'Invalid password - password is a required field.'})
//     }

//     if((req.body.password.length < 6)){
//         return res.json({status: 'error', error: 'Please use a password of at least 6 characters.'})
//     }

//     const hashedPassword = await bcrypt.hash(req.body.password,10)
//     var newUser = {
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword,
//         phone: req.body.phone,
//         user_role: "None"
//          }
//     try {
//         let user = new User(newUser)
//        const response = await user.save(newUser)
//        console.log('New User saved successfully:',response)
//        return res.json({status: 'ok'})

//     } catch(error){
//         console.log(JSON.stringify(error))
//         if(error.code === 11000) {
//             return res.json({status: 'error', error: "Email already in use - please use a different email address."})
//         }
//         throw(error) 
//     }
// })


//!     USER LOGIN
//!     USER LOGIN
//!     USER LOGIN


// app.post('/login', async (req, res) =>{
//     console.log(req.body)
//     const {email, password} = req.body

//     const user = await User.findOne({email}).lean()

//     if(!user){
//         return res.json({status: 'error', error: 'Invalid username/password'})
//     }

//     if(await bcrypt.compare(password, user.password)){
//         const logUser_Role = user.user_role
//         const token = jwt.sign({
//             id: user._id, 
//             name:user.name,
//             user_role:user.user_role
//         }, JWT_Secret, {expiresIn: '12h'})
//         return res.json({status: 'ok', data: token})
        
//     }
//      res.json({status: 'error', error: 'Invalid username/password'})

// })

//! FIND USER FOR ROLE BASED PERMISSIONS
// app.get('/users/:email', (request, response) => {
//     console.log('heres email from client: ',request.params.email);
//     User.findOne({email: `${request.params.email}`}).exec((err, user) => {
//         if (err) return console.error(err);
//         console.log("here's the user info:  ", user)
//         console.log('heres user role:  ',user.user_role)
//         response.send(user);
//     })
// });


//!     USER SELF CHANGE PASSWORD
//!     USER SELF CHANGE PASSWORD
//!     USER SELF CHANGE PASSWORD



app.post('/change-password', async (req, res) =>{
    console.log(req.body)
    const {token, newpassword} = req.body

    if((!req.body.newpassword || typeof req.body.newpassword != 'string')){
        return res.json({status: 'error', error: 'Invalid password - password is a required field.'})
    }

    if((req.body.newpassword.length < 6)){
        return res.json({status: 'error', error: 'Please use a password of at least 6 characters.'})
    }


    try{
    const user = jwt.verify(token, JWT_Secret)
    console.log(user)
    const _id = user.id
    const hashedPassword = await bcrypt.hash(newpassword,10)

    await User.updateOne({_id}, {
        $set: {password: hashedPassword}
    }
        )
    return res.json({status: 'ok'} )
     
    } catch (error){
    res.json({status: 'error', error: 'Invalid token'})
    }
});

//*     LISTEN AT PORT 3000 AND RETURN MESSAGE
//*     LISTEN AT PORT 3000 AND RETURN MESSAGE
//*     LISTEN AT PORT 3000 AND RETURN MESSAGE

// app.listen(3000,()=>{
//     console.log('Server up at 3000')
// })

// module.exports = jwtDecode;


