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
                let listDiv = document.getElementById("updateQTY");
               let itemHtml = `
               <div class = "row">
               <div class = "list col" data-id="${body[i]._id}" id = "itemName">${body[i].itemName} 
               </div>
           
               <div class = "qty col">
                   <label for = "qty">Quantity</label><br>
                   <input type = "number" data-name="${body[i].itemName}" name = "qty" data-id="${body[i]._id}" >
               </div>
           </div>`;

        listDiv.innerHTML += itemHtml;
        
            }
        }).catch(function(err){
            console.log(err);
        });
    };
    //event listener to initiate list function on page load
    window.addEventListener("load", function(event){
        inventoryList();
    })
   // asynch function to update quantities
    async function updateQTY(){
            
            newArr = [];
            
         $('input[name="qty"]').each(function(){
             
            let newQTY = {
                _id  : this.getAttribute("data-id"),
                itemName : this.getAttribute("data-name"),
                itemQty: this.value,
            };
            
            newArr.push(newQTY);
             
            
            
        });
        console.log(newArr);

        let changeQtyOptions = {
            method  : "POST",
            body    : JSON.stringify({data:newArr}),
            headers : {"Content-Type" : "application/json"}
        }
        
        const response = await fetch("/goods", changeQtyOptions);
        const body = await response.json();
        if (response.status != 200){
            throw Error("qty not updated");
        }
        
        console.log(body);
        return body;
        
    };

    //function to update the quantity of items using the form submit
    document.getElementById("updateButton").addEventListener('click', function (event){
        event.preventDefault();
        updateQTY();
        returnToWorkDay();
        console.log("after update qty");
    });

    function returnToWorkDay(){
        location.href = "wastePanic.html";
        displayWorkDayMenu();

    }

