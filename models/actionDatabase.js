const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//COMMENTING OUT FOR NOW TO GET LOGIN WORK DONE 01/21/21

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
// module.exports = mongoose.model("Action", actionSchema );
