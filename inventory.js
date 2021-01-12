

let i = quantity //is this where this goes??

class Inventory{

    

    constructor () {
        this.item = [];
        this.quantity = null;
        //do we make huge starter list and add or remove?
        //this.item=FoodItem??
    }
    get(){
        //get items from source for daily counts
    }
    set(){
        //enter items into page
        location() 
            //can put location into set function
        
    }
    location(){
        //sent counts to proper location

    }
    
    adjustQuantity(){
        //we can make this to add or subtract from inventory counts and eliminate add and remove
    }
    
    waste(){
        //quickly remove one item for waste
    }
    SOS(){
        //function to alert on low inventory of critical items.
        //will send msg to supervisor
        
        if(i <= 1){
            alert(sos);
            currentInventory();
        }
        
    }
    
    reportWaste(){
        //generates a report of waste items-try to make this one by date
        //gets numbers from waste button and reports them
    }
    reportSales(){
        //generates report of sales-try to make by date
    }
    clear(){
        this.quantity = null;
        
    }
    leftovers(){
        //report to get food to those in need.. Daily
    }
}


//Maybe set separate class for baked goods that feeds into inventory
class Goods{
    constructor (category, flavor) {
        this.cat = category; //ie. muffin, scone, burrito
        this.flavor = flavor;//ie. bluberry, cinnamon, bacon
        //or do we just put the item in as is and with one item name instead of cat and flavor
    }
    addItem(){
        //add item to array-example seasonal item
        //push funtion for array or something??
    }
    removeItem(){
        //remove item from array
        //pop function for array or something?
    }
}

class Sides extends Goods{ //this may all be a bit much
    constructor(color){
        this.salsa = color
    }

} 

//need something to take the shift beginning and count to reconcile them with sales/waste