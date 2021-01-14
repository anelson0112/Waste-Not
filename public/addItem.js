//async function to add new items
async function addItem(){
    let item = {
        itemName : document.getElementById("addItem").value
    }

    let addOptions = {
        method  : "POST",
        body    : JSON.stringify(item),
        headers : {"Content-Type" : "application.json"},
    }
    console.log(item);

    const response = await fetch("/good", addOptions);

    if (response.status != 200){
        throw Error("error adding item");
    }
    return console.log(item);
}
 function listAsAdded(){
     addItem().then(function(body){
         let showItemDiv = document.getElementById("seeListAsAdded");
         let showItemHTML = 
         `<div class = "row">
            <div class = "col-lg-12">Item Name: ${itemName}</div>
        </div> `;
        showItemDiv.innerHTML += showItemHTML;
     });
 }