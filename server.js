//require mongoose-translates Node.js
const mongoose = require ("mongoose");
//require body parser
const bodyParser = require('body-parser');
//call in schema models
var Goods = require (".models.database.js");
var Users = require (".models.database.js");
var Locations = require (".models.database.js");

//call in express
const app = express();

//connect to Atlas cluster




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











































