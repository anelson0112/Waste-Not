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
                
                dropWaste.innerHTML += `<option data-id="${body[i]._id}">"${body[i].itemName};"</option>`
        
            }
        }).catch(function(err){
            console.log(err);
        });
    };
    //function to display waste drop and button
    function displayWasteSection (){
        document.getElementById("wasteSection").style.display = "block";
    }
    //function to add drop down when waste is clicked
    document.getElementById("wasteButton").addEventListener('click', function (event){
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
                
                dropPanic.innerHTML += `<option data-id="${body[i]._id}">"${body[i].itemName};"</option>`
        
            }
        }).catch(function(err){
            console.log(err);
        });
    };
    //function to display panic notify drop and button
    function displayPanicSection (){
        document.getElementById("panicSection").style.display = "block";
    }
    //function to add drop down when panic is clicked
    document.getElementById("panicButton").addEventListener('click', function (event){
        displayPanicSection();
        panicList();
    });