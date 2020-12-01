const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


/*This is the schema we will use to enter in the actual items available*/ 
/* for our purposes, it will be much easer to use JSON than XML, all of our items are object oriented which JSON is bbasically made for, it's much easier to read and retrieve data using JSON rather than XML*/
const Goods = new Schema ({
    //name of good to sell
    itemName: { type: String, required : true, maxlength: 25},
    /*quantiy of good to sell, making required so if there are none sent in a given day it will have a zero entered and not accidently ommited.*/
    itemQty: {type: Number, required : true},
    /*price is price, read that you could require USD or decimal, but that is extranious and unneccesary*/
    itemPrice: {type: Number, required: true},
    
});

Users = new Schema ({
    username: String,
    password: String,
    email: email,
    permissions: [{
        admin: Boolean,
    }]
});
/* Location schema, for keeping location separate, can get loaded into the action and User schema as needed*/
const Location = new Schema ({
    storeName: {type: String, required: true, maxlength: 25},
});

Action = new Schema ({
    user: User,
    location: Location,
    items: Goods,
    time: Number,
    panic: Boolean,
    waste: Boolean,
    recount?: Boolean?,
    update permissions modify ???:

})



get sales schema??
/*Willie Example for reference*/
/*var UserLikesSchema = new Schema(
    {
    user: { type: String, required: true, maxlength: 25},
    like: { type: String, required: true }
    }
);
var RoomSchema = new Schema(
    {
        room_id: {type: String, required: true, maxlength: 50 }, 
        room_owner: {type: String, required: true, maxlength: 25 }, 
        room_guests : [String], 
        user_likes : [UserLikesSchema], 
        user_dislikes: [UserLikesSchema],
        distance: { type: Number, required: true, max: 45000, default: 5 }, 
        current_location: [Number], 
        matches: [String], 

    }
)*/
