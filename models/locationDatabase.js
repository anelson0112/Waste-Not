const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


/* Location schema, for keeping location separate, can get loaded into the action and User schema as needed*/
const locationSchema = new Schema ({
    storeName: {type: String, required: true, maxlength: 25},
});



//export schema

module.exports = mongoose.model("Location", locationSchema );

