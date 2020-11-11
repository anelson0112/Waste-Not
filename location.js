"use strict"; 
 
class Location {
    constructor (location) {  //(change argument to location and user? or maybe no arguments?)
        this.location = location; //or use an empty array as this.location = [];
        this.inventory = inventory; 
        //do we need admin, supervisor and barista if they are already logged in
        //as that particular user?  TAKING THESE OUT FOR NOW
        //this.admin = admin; 
        //this.supervisor = supervisor;
        //this.barista = barista;
    } 

        getStoreLocation () {
            //function to get store location 
            //use an array: let stores = ["South Plaza", "Waldo", "Red Bridge"];
            //if this.location === item in array, display that store's UI 
        }

        displayStoreMenu () {
            //function to display each particular store's UI 
            //depends on who is logged in: 
            //if logged in as admin- see global menu (can see all store menus)
            //if logged in as supervisor- see superviosr menu for your store
            //if logged in as barista- see barista menu for your store 
        }
        
        getMyStoreInventory () {
            //function to get your store's inventory
            //displayed w/ the store's UI 
            //depending on which store you select 
            //displays that stores UI  
        }
     
        addLocation () {
            //function to add location
            //if admin (use boolean)
            //input info for new store
            //add new location to current list of locations 
            //show new location 
            //else (not an admin) return "I'm sorry only admins can add locations."
        }

        deleteLocation () {
            //function to delete location 
            //if admin (use boolean) 
            //delete store from list of current locations 
            //else (not an admin) return "I'm sorry only admins can delete locations" 
        }
     
        getGlobalInventory () {
            //function to get global inventory list
            //depends upon who is logging in 
            //if user === this.admin || this.superervisor
            //get global inventory list 
            //else null 
        }    
}

       