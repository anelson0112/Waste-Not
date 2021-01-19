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

    const response = await fetch("/goods", addOptions);
    const body = await response.json();

    if (response.status != 200){
        throw Error("error adding item");
    }
    return console.log(item);
};


 function listAsAdded(){
     addItem().then(function(body){
       
            console.log(body.itemName);
        let showItemDiv = document.getElementById("seeListAsAdded");
         let showItemHTML = 
         `<div class = "row">
            <div class = "col-lg-12">Item Name: ${body.itemName}</div>
        </div> `;
        showItemDiv.innerHTML += showItemHTML;
        
     }).catch(function (err){
         console.error(err);
     });
 }
let addItemButton = document.getElementById("addItemButton");
if (addItemButton)
addItemButton.addEventListener("click", function (event){
     console.log("add item clicked");
     event.preventDefault;
     listAsAdded();
     
 });
