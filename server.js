require('dotenv').config();
//require express
const express = require("express");
const app = express();
//add path library
const path = require("path");
const { response } = require('express');
const { default: jwtDecode } = require('jwt-decode');
//require body parser
const bodyParser = require('body-parser');
//require nodemailer to sent emails
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')
const jwt = require ('jsonwebtoken')
const JWT_Secret = process.env.JWT_SECRET;
const JWT_Refresh = process.env.REFRESH_JWT_SECRET;



//require mongoose-translates Node.js
const mongoose = require ("mongoose");
mongoose.set('useFindAndModify', false);
//returns object AFTER update was applied
mongoose.set('returnOriginal', false);


//mailtrap test 
// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "5ba0b7386d7850",
//       pass: "e15c26797c9e26"
//     }
//   });
//call in schema models
//twilio for sms messages
// var twilio = require('twilio');
// var client = new twilio('AC9add5aa3984a2862ce2338259aec4bee', '2ea872e7ce5bcedc94781c6f976a75f6');

// // Send the text message.
// client.messages.create({
//   to: 'YOUR_NUMBER',
//   from: 'YOUR_TWILIO_NUMBER',
//   body: 'Hello from Twilio!'
// });

var Goods = require ("./models/goodsDatabase.js");
var User = require ("./models/userDatabase.js");
var Location = require ("./models/locationDatabase.js");
var Action = require ("./models/actionDatabase.js");





//declare port to connect to
// const port = 3000;

const port = process.env.PORT || 80;

//connect to Atlas cluster
const mongoLogIn = process.env.mongoInfo
const mongoDB = 'mongodb+srv://'+ mongoLogIn;

// const mongoDB = "mongodb+srv://wastenotskilledkc:madANDal4life2021@wastenot1.sj0ff.mongodb.net/WasteNot1?retryWrites=true&w=majority";


//accessing the connect method of mongoose
//pass it the name of the DB cluster we have created
//mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,}, (err, client) => {
    if(err) return console.error(err);
    console.log('Connected to database');
    });
const db = mongoose.connection;

//turns on the connection
db.on('error', console.error.bind(console, 'connection error:'));


//use the following middlware
app.use(
    //middleware for delivering static files
    express.static(
        //uses path library to take care of relative paths
        path.join(__dirname, 'public')));


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

app.use(express.urlencoded({ extended: false}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(express.json())

//open up server, list on specific id and port
//ip address aka hostnames
app.listen(port, function(){
    console.log("Server is running at " + port)
});

/* Here starts the API Calls*/

//GET LIST OF ALL GOODS
app.get("/goods", function (request, response){

    Goods.find (function(err, goods){
        if (err)
            return console.error(err);
            response.send(goods);
            
        
    });
});
//UPDATE SINGLE ITEM WASTE QTY
app.patch("/good/:id", function (request, response){
    let wasteUpdate = {
        
        wasteQty : request.body.wasteQty,
    }
    console.log(request.body.data);

    Goods.findByIdAndUpdate({_id: request.params.id}, {$inc:wasteUpdate},
        function (error, good){
            if (error){
                response.sendStatus(500);
                return console.error(error);
            }
            console.log(good);
            response.sendStatus(200);

            console.log("qty updated");
            return good;
        });
})
//GET SINGLE ITEM

app.get("/good/:id", function (request, response){

    
    Goods.findById({_id: request.params.id},function (err, good){

        if (err){
        console.error(err);
        return;
        }
        console.log(good);
        response.status(200).send(good);
    });
});
//ADD NEW ITEMS TO LIST

app.post("/good", function (request, response){
    console.log(request.body);

    let newGood = new Goods (request.body);
    newGood.save (function (err, item){
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        //console.log(request.body);
        response.send(item);
    });
});

//DELETE GOODS FROM LIST
app.delete("/goods/:id", function (request, response){

    Goods.deleteOne({_id: request.params.id}, function (err){
        
        if (err){
            console.error(err);
            return
        } 
        console.log("deleted");
        response.sendStatus(204);

    });
});
 

//UPDATE QUANTITY
app.post("/goods", async function (request, response){
    //console.log(request.body.data);
    arr = []
    for(i = 0; i < request.body.data.length; i++){
        
        let good = await getUpdateGood(request.body.data[i]);
            console.log(good);
            arr.push(good);
    
         
    }
    response.status(200).send(arr);
})

async function getUpdateGood(data){
    console.log(data);
    return Goods.findByIdAndUpdate(data._id, {
        itemName : data.itemName,
        itemQty  : data.itemQty,   

    },
    function (error, good){
        if (error) {
            console.error(error);

            return  {error: error};
        }
            console.log("qty updated");
            return good;
    
        
    }); 
}

//!   USER SELF REGISTER

app.post('/register', async (req, res) =>{
    console.log(req.body)
    var email = req.body.email

    if((!req.body.name || typeof req.body.name != 'string')){
        return res.json({status: 'error', error: 'Invalid name - name is a required field'})
    }

    if((!req.body.email || typeof req.body.email != 'string')){
        return res.json({status: 'error', error: 'Invalid email - email is a required field.'})
    }

    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(mailFormat)===null){ 
        return res.json({status: 'error', error: "You have entered an invalid email address!"})
    }

    if ((!req.body.phone || typeof req.body.phone != 'string')){
        return res.json({status: 'error', error: 'Invalid phone - phone is a required field.'})
    }

    if((!req.body.password || typeof req.body.password != 'string')){
        return res.json({status: 'error', error: 'Invalid password - password is a required field.'})
    }

    if((req.body.password.length < 6)){
        return res.json({status: 'error', error: 'Please use a password of at least 6 characters.'})
    }

    const hashedPassword = await bcrypt.hash(req.body.password,10)
    var newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        user_role: "None"
         }
    try {
        let user = new User(newUser)
       const response = await user.save(newUser)
       console.log('New User saved successfully:',response)
       return res.json({status: 'ok'})

    } catch(error){
        console.log(JSON.stringify(error))
        if(error.code === 11000) {
            return res.json({status: 'error', error: "Email already in use - please use a different email address."})
        }
        throw(error) 
    }
});
//!     USER LOGIN


app.post('/login', async (req, res) =>{
    console.log(req.body)
    const {email, password} = req.body

    const user = await User.findOne({email}).lean()

    if(!user){
        return res.json({status: 'error', error: 'Invalid username/password'})
    }

    if(await bcrypt.compare(password, user.password)){
        const logUser_Role = user.user_role
        const token = jwt.sign({
            id: user._id, 
            name:user.name,
            user_role:user.user_role
        }, JWT_Secret, {expiresIn: '12h'})
        return res.json({status: 'ok', data: token})
        
    }
     res.json({status: 'error', error: 'Invalid username/password'})

})

//! FIND USER FOR ROLE BASED PERMISSIONS
app.get('/users/:email', (request, response) => {
    console.log('heres email from client: ',request.params.email);
    User.findOne({email: `${request.params.email}`}).exec((err, user) => {
        if (err) return console.error(err);
        console.log("here's the user info:  ", user)
        console.log('heres user role:  ',user.user_role)
        response.send(user);
    })
});
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
})




//!SERVER SIDE ADD USER

app.post("/users", (request, response) => {
    console.log(request.body);
    let user = new User(request.body);
    user.save((err, item) => {
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        response.sendStatus(200);
    })
});


//!  SERVER SIDE FIND USER
//!  SERVER SIDE FIND USER
//!  SERVER SIDE FIND USER

app.get('/users/:email', (request, response) => {
    console.log(request.params.email);
    User.findOne({email: `${request.params.email}`}).exec((err, user) => {
        if (err) return console.error(err);
        response.send(user);
    })
});




// app.delete('/users/:email', async (request, response) => {
//     console.log(request.params.email);
//     try {
//         await User.deleteOne({email: `${request.params.email}`});
//         response.sendStatus(204);
//     } catch {
//         response.sendStatus(404);
//         console.log('Didnt find the user!');
//     }
// });

//!SERVER SIDE DELETE USER
//!SERVER SIDE DELETE USER
//!SERVER SIDE DELETE USER

app.delete('/users/:id', (request, response) => {
    console.log(request.params.id);
    User.deleteOne({_id: request.params.id},function(err){
        if (err){
            console.error(err)
            console.log('Didnt find the user!')
            return
    } 
    console.log("deleted");
    response.sendStatus(204);
    });

});

// Goods.deleteOne({_id: request.params.id}, function (err){
        
//     if (err){
//         console.error(err);
//         return
//     } 
//     console.log("deleted");
//     response.sendStatus(204);

// });

//SERVER SIDE EDIT USER

app.patch('/users/:_id', (request, response) => {
    console.log(request.body);
    var userUpdateId = request.body._id
    var userUpdateName = request.body.name;
    var userUpdatePassword = request.body.password;
    var userUpdateEmail = request.body.email;
    var userUpdatePhone = request.body.phone;
    var userUpdateUser_Role = request.body.user_role;
    console.log(userUpdateEmail);
   User.findByIdAndUpdate({_id: userUpdateId}, { 
            name : userUpdateName,
            password : userUpdatePassword,
            email : userUpdateEmail,
            phone : userUpdatePhone,
            user_role: userUpdateUser_Role
        }, 
         function (err, docs) { 
        if (err){ 
            console.log(err) 
            } 
    else{ 
        console.log("here's the new user record:"+docs);
        response.status(200).send({ status: 'OK'})
    } 
    }); 
});
  
//ADD NEW LOCATION

app.post("/location", function (request, response){
    console.log(request.body);

    let location = new Location (request.body);
    location.save (function (err, location){
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        
        response.send(location);
    });
});


//SERVER SIDE DELETE LOCATION


app.delete("/location/:id", function (request, response){

    Location.deleteOne({_id: request.params.id}, function (err){
        
        if (err){
            console.error(err);
            return
        } 
        console.log("deleted");
        response.sendStatus(204);

    });
});
//GET FULL LIST OF LOCATIONS

app.get('/locations', function (request, response){

    Location.find (function(err, locations){
        if (err)
            return console.error(err);
            response.send(locations);
            
        
    });
});

//GET SINGLE LOCATION
app.get("/location/:id", function (request, response){

    
    Location.findById({_id: request.params.id},function (err, location){

        if (err){
        console.error(err);
        return;
        }
        console.log("line 346");
        console.log(location);
        response.status(200).send(location);
    });
});
//SEND EMAIL
// route which captures form details and sends it to your personal mail
app.post('/sendemail',(req,res)=>{
    console.log("line 287");
    console.log(req.body);
    
    let transport = nodemailer.createTransport({
    service : 'gmail',
    auth :{
        user: 'wastenotskilledkc@gmail.com',
        pass : 'madANDal4life@2021',
    }
    });
   
    var mailOptions = {
    from: 'wastenotskilledkc@gmail,com',
    to: 'anelson0112@skilledkc.org,               mgengelbach0161@skilledkc.org',
    subject: `Running low on- ${req.body.itemName} at ${req.body.storeName}`,
    html:
    // `<h1>Contact details</h1>
    // <h2> name:${req.body.name} </h2><br>
    // <h2> email:${req.body.email} </h2><br>
    // <h2> phonenumber:${req.body.phonenumber} </h2><br>
    `<h2> ${req.body.itemName} is running low at ${req.body.storeName} and needs restocking</h2>`
    };
    /*
     Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
    call back as parameter
    */
    transport.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    res.send('error') // if error occurs send error as response to client
    }
    else {
    console.log('Email sent: ' + info.response);
    
    res.send('Sent Successfully')
    //if mail is sent successfully send Sent successfully as response
    }
    });
    });
//NOTIFICATION EMAIL FOR NEW USER
    app.post('/sendemail/newUser',(req,res)=>{
        console.log("line 287");
        console.log(req.body);
        
        let transport = nodemailer.createTransport({
        service : 'gmail',
        auth :{
            user: 'wastenotskilledkc@gmail.com',
            pass : 'madANDal4life@2021',
        }
        });
       
        var mailOptions = {
        from: 'wastenotskilledkc@gmail,com',
        to: 'anelson0112@skilledkc.org,               mgengelbach0161@skilledkc.org',
        subject: `New User Has Registered For Waste Not`,
        html:
        // `<h1>Contact details</h1>
        // <h2> name:${req.body.name} </h2><br>
        // <h2> email:${req.body.email} </h2><br>
        // <h2> phonenumber:${req.body.phonenumber} </h2><br>
        `<h2> ${req.body.name} has registered with email ${req.body.email} and needs to be assigned a user role. </h2>`
        };
        /*
         Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
        call back as parameter
        */
        transport.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        res.send('error') // if error occurs send error as response to client
        }
        else {
        console.log('Email sent: ' + info.response);
        
        res.send('Sent Successfully')
        //if mail is sent successfully send Sent successfully as response
        }
        });
        });

    // client.messages.create({
    //     to: 'YOUR_NUMBER',
    //     from: 'YOUR_TWILIO_NUMBER',
    //     body: 'Hello from Twilio!'
    //   });

    //   client.sendMessage()



    module.exports = jwtDecode;