Goods = new Schema ({
    itemName: String,
    itemQty: Number,
    itemPrice: Number,
    
});


//create new schema called Users 
//we chose to have a schema of Users b/c there are different permission levels and access
//depending on who is logged in 
//this schema makes it easy to put the User schema into our other data (which will tie in w/ who is logged in)
Users = new Schema ({
    //username is stored as a string 
    username: String,
    //password is stored as a string 
    password: String,
    //email is stored as a string 
    email: String,
    //there are different permission levels depending on the user 
    //this lists the different user types as an array and looks for the Boolean value to be true
    //creating an array makes it easier to iterate over the data to see which permission level/user is selected/logged in  
    permissions: [{
        admin: Boolean,
        barista: Boolean,
        bakery: Boolean, 
    }]
});

/*For the User schema: Pros and cons of developing the documents in XML vs JSON- 

There are many advantages of developing the documents in JSON. JSON is much more readable 
than XML. For XML, you are required to create custom tags for each item (i.e.<password></password>), whereas
JSON is similiar to JavaScript objects (i.e. key/value pairs). JSON also uses a map data strucutre,
which is much more readable and intuitive than XML's tree structure. The biggest con of XML 
is that it has to be parsed with a XML parser, where JSON can be parsed by a Javascript function (json.parse(string))
and saved to a variable. Lastly, JSON can use arrays, whereas XML cannot. All in all, JSON will be a 
much better fit for the User schema, as it will allow us to easily manipulate and use the data with JavaScript. */ 

Location = new Schema ({
    store: String,
});

Action = new Schema ({
    //date is required and will default to "now" if another date is not input
    date: {type: Date, default: Date.now, required: true},
    //user below is borrowing from User schema to ensure consistency
    user: {type: Schema.type.Objectid, ref:User, required: true},
    //item is similar to user except references Goods schema
    item: {type:Schema.type.Objectid, ref:Goods},
    //for the different "states" of items, using enumeration to limit the choices of answers for the string
    itemState: { type: String, enum: ['waste', 'panic', 'for_sale', 'day_old'] },
    //borrowing from location schema
    location: {type: Schema.type.Objectid, ref:Location},
    //if an item state is declared, a quantity will be input as a number
    qty: Number,
    //some actions are done by admins, and a type is registered with limited choices
    adminAct:{ type: String, enum: ['add', 'delete', 'modify'] },
    //these last two are for setting up new, delete, or modifying a user or location
    //again borrowing from the proper schema for consistency
    newUser: {type: Schema.type.Objectid, ref:User, required: true},
    newLocation: {type: Schema.type.Objectid, ref:Location}
    });

    /*Regarding XML v JSON: here's an interesting article from StackOverflow
    https://stackoverflow.com/questions/325085/when-to-prefer-json-over-xml
    
    Favor XML over JSON when any of these is true:

    You need message validation
    You're using XSLT
    Your messages include a lot of marked-up text
    You need to interoperate with environments that don't support JSON

    Favor JSON over XML when all of these are true:

    Messages don't need to be validated, or validating their deserialization is simple
    You're not transforming messages, or transforming their deserialization is simple
    Your messages are mostly data, not marked-up text
    The messaging endpoints have good JSON tools

    ***My comments: I think our use case, besides requiring JSON since Mongo and
    mongoose, is that we don't have a serious amount of validation, no marked up
    text to write to database, and our endpoints are JSON ready.  */

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
