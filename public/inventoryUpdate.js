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
    function inventoryList(){
        getItemList().then(function(body){

            for (let i = 0; i < body.length; i++){
                console.log(body[i].itemName);
                console.log(body[i]._id)
                console.log("getting the items");
                let listDiv = document.getElementById("itemList");
               let itemHtml = `
            <div class = "goodsList" data-id = "${body[i]._id}">
                <div class = "row">
                    <div class = "list col-lg-10" data-id="${body[i]._id}">Item Name: ${body[i].itemName} 
                    </div>
                
                    <div class = "qty col-lg-2">
                        <label for = "qty">Quantity</label>
                        <input type = "number" id = "qty" name = "qty" data-id="${body[i]._id}">
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
    //event listener to initiate list function on page load
    window.addEventListener("load", function(event){
        inventoryList();
    })
    //asynch function to update quantities
    // async function updateQTY(){
    //     let updateQTY ={
    //         itemQty = document.getElementById("qty").value,
    //     }

    //     let changeQtyOptions = {
    //         method  : "POST",
    //         body    : updateQTY,
    //         headers : {"Content-Type" : "application/json"}
    //     }
    //     const response = await fetch("/goods/" + g_id, changeQtyOptions);
    //     if (response.status != 200){
    //         throw Error("qty not updated");
    //     }
    //     console.log("QTY Updated");
    //     return;
    // };