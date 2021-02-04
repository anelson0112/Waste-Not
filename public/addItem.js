//const { response } = require("express");

const url = window.location.href;
const myUrl = new URL(url);
let g_id = myUrl.searchParams.get('id');



//async function to retrieve all items on the list of goods
async function getItemList(){

    let requestOptions = {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
            }
        }
        const response = await fetch("/goods", requestOptions);
        const body = await response.json();

        if (response.status != 200){
            throw Error(body.message);
        }
        return body;
    };
//function to display list
function showList(){
    getItemList().then(function(body){
        ;
        for (let i = 0; i < body.length; i++){
            console.log(body[i].itemName);
            console.log(body[i]._id)
            console.log("getting the items");
            let listDiv = document.getElementById("seeListAsAdded");
           let itemHtml = `
        <div class = "goodsList">
            <div class = "row">
                <div class = "list col-lg-10" data-id="${body[i]._id}">${body[i].itemName} 
                </div>
                <div class = "delete col-lg-2" ><i class="far fa-trash-alt" id = "delete" data-id = "${body[i]._id}" ></i>
                </div> 
            </div>
        </div>`;

    listDiv.innerHTML += itemHtml;
    console.log("after update html");
        }

    let deleteButtons = document.getElementsByClassName("delete");
        for (let i = 0; i < deleteButtons.length; i++ ){
            deleteButtons[i].addEventListener("click", function(event){
                deleteItem(event.target.dataset.id);
                console.log(event.target);
            });
        }

    }).catch(function(err){
        console.log(err);
    });
};
//add event listener to initiate function onload of page
window.addEventListener("load", function (event){
    showList();
})
//async function to add new items
async function addItem(){
    let item = {
        itemName : document.getElementById("itemName").value
    }

    let addOptions = {
        method  : "POST",
        body    : JSON.stringify(item),
        headers : {"Content-Type" : "application/json"},
    }
    console.log(item);

    const response = await fetch("/good", addOptions);
    const body = await response.json();

    if (response.status != 200){
        throw Error("error adding item");
    }
    console.log(item);
    return item;
};
 
//function to add new items and show the list
 function listAsAdded(){
     

     addItem().then(function(item){
     
        
        console.log("after then");
        
        location.reload();
     }).catch(function (err){
         console.error(err);
     });
 }

//event listener to start function
 let addItemButton = document.getElementById("addItemButton");
    if (addItemButton)
    addItemButton.addEventListener("click", function (event) {

     console.log("add item clicked");
     event.preventDefault;
     listAsAdded();
     
 });

 //function to get a single item and display it as it is added to the list.
 async function getItemAsAdded(){
     let item = {
         itemName : document.getElementById("itemName").value,
     }
     
    let reqOptions = {
        method : "GET",
        body    : JSON.stringify(item),
        headers : {
            "Content=Type" : "application/json",
        }
     }
     console.log("get one item");
     const response = await fetch('/good' , reqOptions);
     const body     = await response.json();

     if(response.status != 200){
         throw Error(body.message);
     }
     return body;
     
 };
//async delete function
 async function deleteItemRequest(id){

    let reqOptions = {
        method : "DELETE",

        headers : {
            "Content-Type" : "application/json"
        }
    }
        const response = await fetch('/goods/' + id, reqOptions);
        console.log(response);

        return false;
    
 };
//function to delete
 function deleteItem(id){

    // let deleteId = document.getElementById("delete").getAttribute("data-id");
     confirm("Are you sure you want to delete this item?");

     deleteItemRequest(id).then(function(success){
        console.log(success);
         alert("Item Deleted");
        location.reload();
     }).catch(function(error){
         console.log(error);
     });
 };