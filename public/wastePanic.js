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

    //function do add items to drop down list for waste
    function wasteList(){
        getItemList().then(function(body){

            for (let i = 0; i < body.length; i++){
                console.log(body[i].itemName);
                console.log(body[i]._id)
                console.log("getting the items");
                let dropWaste = document.getElementById("wasteDrop");
                //let wasteOptions = document.createElement('option');
                
                dropWaste.innerHTML += `<option value = "${body[i]._id}" data-name = "${body[i].itemName}" data-id="${body[i]._id}">${body[i].itemName}</option>`
        
            }
        }).catch(function(err){
            console.log(err);
        });
    };
    //function to display waste drop and button
    function displayWasteSection (){
        document.getElementById("wasteSection").style.display = "block";
    }
//function hides panic button when waste is clicked
    function hidePanic(){

        document.getElementById("panicButton").style.display = "none";

    }
    //function to add drop down when waste is clicked
    document.getElementById("wasteButton").addEventListener('click', function (event){
        hidePanic();
        displayWasteSection();
        wasteList();
    });


    function panicList(){
        getItemList().then(function(body){

            for (let i = 0; i < body.length; i++){
                console.log(body[i].itemName);
                console.log(body[i]._id)
                console.log("getting the items");
                let dropPanic = document.getElementById("panicDrop");
                //let wasteOptions = document.createElement('option');
                
                dropPanic.innerHTML += `<option value = "${body[i]._id}" data-name = "${body[i].itemName}" data-id="${body[i]._id}">${body[i].itemName}</option>`
        
            }
        }).catch(function(err){
            console.log(err);
        });
    };
    //function to display panic notify drop and button
    function displayPanicSection (){
        document.getElementById("panicSection").style.display = "block";
    }

    //function to hide waste button when panic is clicked
    function hideWaste(){
        document.getElementById("wasteButton").style.display = "none";
    }

    //function to add drop down when panic is clicked
    document.getElementById("panicButton").addEventListener('click', function (event){
        hideWaste();
        displayPanicSection();
        panicList();
    });
//function to increment with plus button
    function incrementWaste(){
        document.getElementById("wasteInput").stepUp();
    }

//event listener to trigger increment
document.getElementById("plus").addEventListener('click', function (event){
    event.preventDefault();
    incrementWaste();
   
});

//function to decrement with minus button
    function decrementWaste(){
        document.getElementById("wasteInput").stepDown();
    }
    
//event listener to trigger decrement    
    document.getElementById("minus").addEventListener('click', function (event){
        event.preventDefault();
        decrementWaste();
       
    });

    function cancel(){
        location.reload();
    }

    document.getElementById("cancel").addEventListener("click", function(event){
        event.preventDefault();
        cancel();
    })

    document.getElementById("cancelP").addEventListener("click", function(event){
        //event.preventDefault();
        cancel();
    });

    //async function to update waste quantity
    async function updateWaste(){
        let drop = document.getElementById("wasteDrop");
        let _id = drop.options[drop.selectedIndex].value;
        let wasteUpdate = {
            _id : _id,
            wasteQty : this.document.getElementById("wasteInput").value,
        }
        console.log(wasteUpdate);
        let requestOptions = {
            method : "PATCH",
            body: JSON.stringify(wasteUpdate),
            headers : { "Content-Type": "application/json" },
        }

        const response = await fetch("/good/" + _id, requestOptions);
        const body = await response.json();

        if (response.status != 200){
            throw Error ("not updated");
        }
        console.log ("waste updated");
        return body;
    };

    //function to update waste
    function wasteItem(){
        console.log("got value?");
        updateWaste().then(function(success){
            console.log(success);
            // alert("Waste Added");
            // location.reload();

        }).catch(function(error){
            console.log(error);
        });
    }
//event listener to call function
document.getElementById("submitWaste").addEventListener("click", function (event){
    event.preventDefault();
    selectedItem();
    wasteItem();
    alert("Waste Quantity Recorded");
    location.reload();
})
//async function to get single item
async function getSingleItem(){
    let drop = document.getElementById("wasteDrop");
    let _id = drop.options[drop.selectedIndex].value;
    let requestOptions = {
        method : 'GET',
        headers : {"Content-Type" : "application/json"},
    }
    console.log("get single item");
const response = await fetch('/good/'+ _id, requestOptions);
const body = await response.json();

if (response.status != 200){
    throw Error(body.message);

}
    return body;
};

function selectedItem(){
    getSingleItem().then(function(good){
        let drop = document.getElementById("wasteDrop");
        let _id = drop.options[drop.selectedIndex].value;
        
        console.log(_id);
    }).catch(function(error){
        console.log(error);
    });
};

// let select = document.getElementById("wasteDrop");

// select.addEventListener('click', function (event){
//     event.preventDefault();
//     selectedItem();
// })