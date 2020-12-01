Inventory = new Schema ({
    itemName: String,
    itemQty: Number,
    itemPrice: Number,
    itemState: [{
        dayOld: Boolean,
        waste: Boolean,
        sold: Boolean,
        panic: Boolean,
    }]

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