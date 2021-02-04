const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


/*This is the schema we will use to enter in the actual items available*/ 
/* for our purposes, it will be much easer to use JSON than XML, all of our items are object oriented which JSON is bbasically made for, it's much easier to read and retrieve data using JSON rather than XML*/
const opts = {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,

  };

const goodsSchema = new Schema ({
    //name of good to sell
    itemName: { 
        
        type: String, 
        required : true,
        maxlength: 25},
    
    /*quantiy of good to sell, making required so if there are none sent in a given day it will have a zero entered and not accidently ommited.*/
    itemQty: {
        
        type: Number, 
        default : 0,
        
        },
    /*price is price, read that you could require USD or decimal, but that is extranious and unneccesary*/
    //itemPrice: {type: Number, required: true},
    wasteQty: {
        type : Number,
        default : 0,
        
    }, 
    
},
        opts
);

//export schema
module.exports = mongoose.model("Goods", goodsSchema );
