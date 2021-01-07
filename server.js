//require mongoose-translates Node.js
const mongoose = require ("mongoose");
//require body parser
const bodyParser = require('body-parser');
//call in schema models
var Goods = require ("./models.models.js");
var Users = require ("./models.models.js");
var Locations = require ("./models.models.js");
//require express
const express = require("express");
//call in express
const app = express();
//add path library
const path = require("path");

//connect to Atlas cluster
const mongoDB = "mongodb+srv://wastenotskilledkc:madANDal4life2021@wastenot1.sj0ff.mongodb.net/test"


//accessing the connect method of mongoose
//pass it the name of the DB cluster we have created
//mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
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

/* Here starts the API Calls*/

//get a list of all the goods
app.get("/goods", function (request, response){

    Goods.find (function(err, goods){
        if (err){
            return console.error(err);
            response.send(goods);
            
        }
    });
});
//get a single item
app.get("/goods/:id", function (request, response){

    Goods.findOne({_id: request.params.id},function (err, good){
        if (err){
        console.error(err);
        return;
        }
        console.log(good);
        response.status(200).send(good);
    });
});
//add new items to the goods list
app.post("/goods", function (request, response){
    let newGood = new Goods (request.body);
    newGood.save (function (err, good){
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        response.send(good);
    });
});

//delete items from goods list
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

//update item on list 
app.put("/update/:id", function(request, response){

    Goods.findOneAndUpdate({_id:request.params.id}, function(err, good){
        if (err) {
            response.sendStatus(500);
            return console.error(err);
        }
        console.log("item updated")
        response.sendStatus(200);
        good.save();
    });
});
//update part of a good just quantity may not need the put option
app.patch("/goods/:id", function (request, response){

    Goods.findOneAndUpdate({_id:request.params.id}, function (err, good){
        if (err){
            console.error(err);
            return
        }
        console.log("qty updated");
        response.statud(200);
        good.save();
    })
})











































