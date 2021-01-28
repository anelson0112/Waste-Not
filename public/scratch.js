function incrementWaste(){
    document.getElementById("wasteInput").stepUp();
}
function decrementWaste(){
    document.getElementById("wasteInput").stepDown();
}

document.getElementById("plus").addEventListener('click', function (event){
    incrementWaste();
   
});

document.getElementById("minus").addEventListener('click', function (event){
    decrementWaste();
   
});