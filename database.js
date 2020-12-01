Goods = new Schema ({
    itemName: String,
    itemQty: Number,
    itemPrice: Number,
    
});

Users = new Schema ({
    username: String,
    password: String,
    email: email,
    permissions: [{
        admin: Boolean,
    }]
});

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
