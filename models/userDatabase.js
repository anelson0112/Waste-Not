const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


// /*This is the schema we will use to enter in the actual items available*/ 
// /* for our purposes, it will be much easer to use JSON than XML, all of our items are object oriented which JSON is bbasically made for, it's much easier to read and retrieve data using JSON rather than XML*/
// const goodsSchema = new Schema ({
//     //name of good to sell
//     itemName: { 
        
//         type: String, 
//         required : true,
//         maxlength: 25},
    
//     /*quantiy of good to sell, making required so if there are none sent in a given day it will have a zero entered and not accidently ommited.*/
//     itemQty: {
        
//         type: Number, 
//         default : 0},
//     /*price is price, read that you could require USD or decimal, but that is extranious and unneccesary*/
//     //itemPrice: {type: Number, required: true},
        
// });


//create new schema called Users 
//we chose to have a schema of Users b/c there are different permission levels and access
//depending on who is logged in 
//this schema makes it easy to put the User schema into our other data (which will tie in w/ who is logged in)
const userSchema = new Schema ({
    //username is stored as a string 
    name: {type: String, required: true, maxlength: 30},
    //password is stored as a string 
    password: {type: String, required: true},
    //email is stored as a string, email must be unique  
    email: {type: String, required: true, unique: true},
    //phone is stored as a string, email must be unique  
    phone: {type: String, required: true},
    //there are different permission levels depending on the user  
    user_role: { type: String, enum: ['None', 'Admin', 'Barista', 'Bakery'] }
});


/* Location schema, for keeping location separate, can get loaded into the action and User schema as needed*/
// const locationSchema = new Schema ({
//     storeName: {type: String, required: true, maxlength: 25},
// });



//COMMENTING OUT FOR NOW TO GET LOGIN WORK DONE 01/14/21

// const actionSchema = new Schema ({
    
//     //date is required and will default to "now" if another date is not input
//     date: {type: Date, default: Date.now, required: true},
//     //user below is borrowing from User schema to ensure consistency
//     user: {type: Schema.type, ref:User, required: true},
//     //item is similar to user except references Goods schema
//     item: {type:Schema.type, ref:Goods},
//     //for the different "states" of items, using enumeration to limit the choices of answers for the string
//     itemState: { type: String, enum: ['waste', 'panic', 'for_sale', 'day_old'] },
//     //borrowing from location schema
//     location: {type: Schema.type, ref:Location},
//     //if an item state is declared, a quantity will be input as a number
//     qty: Number,
//     //some actions are done by admins, and a type is registered with limited choices
//     adminAct:{ type: String, enum: ['add', 'delete', 'modify'] },
//     //these last two are for setting up new, delete, or modifying a user or location
//     //again borrowing from the proper schema for consistency
//     newUser: {type: Schema.type, ref:User, required: true},
//     newLocation: {type: Schema.type, ref:Location}
//     });


//export schema
module.exports = mongoose.model("User", userSchema );
// module.exports = mongoose.model("Location", locationSchema );
// module.exports = mongoose.model("Goods", goodsSchema );
