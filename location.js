"use strict"; 
 
class Location {
    constructor () {  //should location be the argument or should we leave blank? 
        this.location = location;  
        //do we need admin, supervisor and barista if they are already logged in
        //as that particular user? 
        this.admin = admin; 
        this.supervisor = supervisor;
        this.barista = barista;
        //do we need this one? 
        this.inventory = inventory; 

    } 

        getStoreLocation () {
         //function to get store location 
         //use an array: let stores = ["South Plaza", "Waldo", "Red Bridge"];
         //if this.location === item in array, display that store's UI 
        }
     
        addLocation () {
         //function to add location
         //use boolean, if admin, input info for new store, and add location
         //else null 
        }

        deleteLocation () {
         //function to delete location 
         //use boolean, if admin, delete store
         //else null 
        }
     
        getGlobalInventory () {
        //function to get global inventory list
        //depends upon who is logging in 
        //if user === this.admin || this.superervisor
        //get global inventory list 
        //else null 
        }
     
        getMyStoreInventory () {
         //function to get your store's inventory
         //displayed w/ the store's UI 
         //depending on which store you select
         //displays that stores UI  
        }

        displayStoreMenu () {
         //function to display the working menu 
         //if logged in as admin- see global menu
         //if logged in as supervisor- see superviosr menu
         //if logged in as barista- see barista menu 
        }
}