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
