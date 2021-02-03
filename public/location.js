const url = window.location.href;
const myUrl = new URL(url);
let g_id = myUrl.searchParams.get('id');

//async function to retrieve full location list

async function getLocationList(){

    let requestOptions = {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
            }
    }
    const response = await fetch("/locations", requestOptions);
    const body = await response.json();

    if (response.status != 200){
        throw Error(body.message);
    }
    return body
};

//function to display location list
function showLocations(){
    getLocationList().then(function(body){
        for (let i = 0; i <body.length; i++){
            let listDiv = document.getElementById("locationList");

            let locationHtml = `<div class = "locations">
            <div class = "row">
                <div class = "list col-lg-10" data-id="${body[i]._id}">Item Name: ${body[i].storeName} 
                </div>
                <div class = "delete col-lg-2" ><i class="far fa-trash-alt" id = "delete" data-id = "${body[i]._id}" ></i>
                </div> 
            </div>
        </div>`;

        listDiv.innerHTML += locationHtml;
        }

        let deleteButtons = document.getElementsByClassName("delete");
        for (let i = 0; i < deleteButtons.length; i++ ){
            deleteButtons[i].addEventListener("click", function(event){
                deleteLocation(event.target.dataset.id);
                console.log(event.target);
            });
        }
    }).catch(function(err){
        console.log(err);
    });
};

window.addEventListener("load", function (event){
    showLocations();
});
//async function to add items
async function addLocation(){
    let location = {
        storeName : document.getElementById("storeName").value,
    }

    let addOptions = {
        method  : "POST",
        body    : JSON.stringify(location),
        headers : {"Content-Type" : "application/json"},
    }
    console.log(location);

    const response = await fetch("location", addOptions);
    const body = await response.json();

    if (response.status != 200){
        throw Error("error adding location");
    }
    return location;
};

//function to add locations and show the list
function addAndList(){
    addLocation().then(function(location){
        console.log("after then");
        window.location.reload();
    }).catch(function(err){
        console.error(err);
    });
}

//add event listener to trigger function


document.getElementById("addStore").addEventListener('click', function (event){
    event.preventDefault();
    console.log("clicked");
    addAndList();
});

//async delete function
async function deleteLocationRequest(id){

    let requestOptions = {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        }
    }

    const response = await fetch ('/location/' + id, requestOptions);
    console.log(response);
    return false;
}

//function to delete 
 function deleteLocation(id){
     confirm("Are you sure you want to delete this location?");
     deleteLocationRequest(id).then(function (success){
         console.log(success);
         alert("Location deleted");
         window.location.reload();

     }).catch(function(error){
         console.log(error);
     });
 };