//require mongoose-translates Node.js
const mongoose = require ("mongoose");
mongoose.set('useFindAndModify', false);
//returns object AFTER update was applied
mongoose.set('returnOriginal', false);
//require body parser
const bodyParser = require('body-parser');
//call in schema models


var Goods = require ("./models/goodsDatabase.js");
var User = require ("./models/userDatabase.js");
var Location = require ("./models/locationDatabase.js");
var Action = require ("./models/actionDatabase.js");

//require express
const express = require("express");
//call in expressnpm kickoff

const app = express();
//add path library
const path = require("path");

//declare port to connect to
const port = 3000;

//connect to Atlas cluster
const mongoDB = "mongodb+srv://wastenotskilledkc:madANDal4life2021@wastenot1.sj0ff.mongodb.net/WasteNot1?retryWrites=true&w=majority";


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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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
app.put("/good/:id", function (request, response){
    let wasteUpdate = {
        
        wasteQty : request.body.wasteQty,
    }
    console.log(request.body.data);

    Goods.findByIdAndUpdate({_id: request.params.id}, wasteUpdate,
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


    Goods.findOne({_id: request.params.id},function (err, good){

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

//SERVER SIDE ADD USER

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


// SERVER SIDE FIND USER
app.get('/users/:email', (request, response) => {
    console.log(request.params.email);
    User.findOne({email: `${request.params.email}`}).exec((err, user) => {
        if (err) return console.error(err);
        response.send(user);
    })
});

//SERVER SIDE DELETE USER

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
   //SERVER SIDE ADD LOCATION

app.post("/location", (request, response) => {
    console.log(request.body);
    let location = new Location(request.body);
    user.save((err, item) => {
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        response.sendStatus(200);
    })
});

//SERVER SIDE DELETE LOCATION

app.delete('/location', async (request, response) => {
    try {
        await Location.deleteOne({storeName: request.params.storeName});
        response.sendStatus(204);
    } catch {
        response.sendStatus(404);
        console.log('Didnt find the location!');
    }
});
