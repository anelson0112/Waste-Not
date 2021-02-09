const url = window.location.href;
const myUrl = new URL(url);
let g_id = myUrl.searchParams.get('id');

//function to add locations to drop down list for selection

//async function to get location list
async function getLocationList(){
    let requestOptions = {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
            }
    }
    const response = await fetch('/locations', requestOptions);
    const body = await response.json();

    if (response.status != 200){
        throw Error(body.message);
    }
    return body
};

//function to add locations to drop down list for selection
function locationList(){
    getLocationList().then(function (body){
        for ( let i = 0; i < body.length; i ++){
            console.log(body[i].storeName);
            console.log("getting locations");

            let locationDrop = document.getElementById('locationDrop');

            locationDrop.innerHTML += 

            `<option value = "${body[i].storeName}" data-name = "${body[i].storeName}" id = "${body[i]._id}" data-id="${body[i]._id}">${body[i].storeName}</option>`
        }
    }).catch(function(err){
        console.log(err);
    });
};

//function to load location drop down menu on page load
window.addEventListener('load', function(event){
    locationList();
})
//async function to get location  
// async function getSingleLocation(){
//     let drop = document.getElementById("locationDrop");
//     let locId = drop.options[drop.selectedIndex].getAttribute("data-id");
//         let storeName = drop.options[drop.selectedIndex].value;

//     let requestOptions = {
//         method : "GET",
//         headers : {
//             "Content-Type" : "application/json"
//         },
//     }
//     console.log("get single location");

//     const response = await fetch('/location/' + locId, requestOptions);
//     const body = await response.json();

//     if (response.status != 200){
//         throw Error(body.message);
//     }
//     return body;
// };

//function to select location from drop 
// function selectedLocation(){
//     getSingleLocation().then( function(location){
//         let drop = document.getElementById("locationDrop");
//         let locId = drop.options[drop.selectedIndex].dataset.id;
//         let storeName = drop.options[drop.selectedIndex].value;

//         console.log(locId);
//         console.log(storeName);
//     }).catch(function(error){
//         console.log(error);
//     });
// };
//function to show nav buttons
function displayWorkDayMenu(){
    //if barista do this
    document.getElementById("locationSelect").style.display = "none";
    document.getElementById("workDayMenu").style.display = "block";
}

//event listener to select location and show in div
document.getElementById('locationDrop').addEventListener('change', function (event){
    let selectedLoc = document.getElementById("selectedLocation");

    console.log(event.target.options[event.target.selectedIndex].dataset.id);
   

    console.log(selectedLoc);
    
    selectedLoc.innerHTML += `<h2 id = "${event.target.options[event.target.selectedIndex].dataset.id}" value = "${event.target.value}">${event.target.value}</h2>`;

    event.preventDefault();
   localStorage.setItem("locationName",event.target.value);
    displayWorkDayMenu();
});

//event listener to get single location and take to next page
document.getElementById("goToInventoryUpdate").addEventListener('click', function (event){
    // let selectedLoc = document.getElementById("selLoc");

   
    // console.log(selectedLoc);
    event.preventDefault();
    location.href = "./inventoryUpdate.html";
    selectedLocation();
    

})
