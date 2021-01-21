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
        <div class = "goodsList" data-id = "${body[i]._id}">
            <div class = "row">
                <div class = "list col-lg-10" data-id="${body[i]._id}">Item Name: ${body[i].itemName} 
                </div>
            </div>
        </div>`;

    listDiv.innerHTML += itemHtml;
    console.log("after update html");
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
 
 function listAsAdded(){
     

     addItem().then(function(item){
     
        // let itemName = document.getElementById("addItem").value = body.itemName;
        
            console.log("after then");
        let showItemDiv = document.getElementById("seeListAsAdded");
        let showItemHTML = 
            `<div class = "row">
                <div class = "col-lg-12" id = "addItem">Item Name: ${item.itemName}</div>
            </div> `;
        showItemDiv.innerHTML += showItemHTML;
        
     }).catch(function (err){
         console.error(err);
     });
 }

//event listner to start function
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

 