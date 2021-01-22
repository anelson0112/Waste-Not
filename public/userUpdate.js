//const lookupEmail = document.getElementById('editEmail').value;


//CLIENT SIDE ADD USER
//CLIENT SIDE ADD USER
//CLIENT SIDE ADD USER

function clickAddUserByAdmin(){
    addUser().then(function(body){
       console.log(body); 

  }).catch(function(err){
      console.log(err);
  });
};

async function addUser(){

 let user = {
     name : document.getElementById("editName").value, 
     password : document.getElementById("editPassword").value,
     email : document.getElementById('editEmail').value,
     phone : document.getElementById('editPhone').value,
     //commented line below out because new adds will always have user role of None
     user_role: document.querySelector('input[name="editUserRole"]:checked').value
     //user_role: 'None'

 } 

console.log (user);

 let requestOptions = {
     method: 'POST',
     body: JSON.stringify(user),
     headers: {'Content-Type': 'application/json'}
 }


 const response = await fetch('/users', requestOptions);
 if (response.status != 200){
     throw Error('User not saved!');
 } 
    alert('New user added');
 return true;
 //this code reloads the appropriate page after the add  
 window.location.href = 'user-updates.html';

}

//CLIENT SIDE FIND USER
//CLIENT SIDE FIND USER
//CLIENT SIDE FIND USER
//let lookupEmail = document.getElementById('editEmail').value;
function clickGetUser(lookupEmail){
    lookupEmail = document.getElementById('editEmail').value;

    console.log(document.getElementById('editEmail').value)
    console.log(lookupEmail)
 
     getUser(lookupEmail).then(function(body){

   

        let showUserRole=body.user_role;
        console.log(showUserRole);
        
        //User Info into HTML Page
        document.getElementById('editName').value=body.name;
        document.getElementById('editEmail').value=body.email;
        document.getElementById('editPhone').value=body.phone;
        document.getElementById('editPassword').value=body.password;
        //Switch Case for User Role 
        switch (showUserRole) {
            case "None":
                document.getElementById('editUserRoleNone').checked=true;
                break;
            case "Barista":
                document.getElementById('editUserRoleBarista').checked=true;
                break;    
            case "Bakery":
                document.getElementById('editUserRoleBakery').checked=true;
                break;
            case "Admin":
                    document.getElementById('editUserRoleAdmin').checked=true;
                break;    
            default:
                console.log("No User Role value found - error!")
                break;
        }

         console.log(body); 
     }).catch(function(err){
         console.log(err);
     });
 };


async function getUser(lookupEmail){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }
    let editLookupEmail = lookupEmail;
    
    //const response = await fetch('/users', requestOptions)
   const response = await fetch('/users/' + editLookupEmail, requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error('Error!');
    }
    return body;
}
// async function itemEditCard(body) {
//     //code line below empties card so no dups on extra presses :)
//     $("#editId").empty();
//     // Function for display article data and generating a bootstrap card
//     let card = "<div class='card bg-dark text-center mx-auto col col-sm-4'>";
//     card += "<div class='card-header'>"+ "Assignee: "+ body.assignee +"</div>";
//     card += "<div class='card-body'>";
//     card += "<h5 class='card-title'>" + body.itemName + "</h5>";
//     card += "<p class='card-text'>" + "Priority: "+ body.itemPriority + "</p>";
//     card += "<p class='card-text'>" + "Completed?  "+body.completed + "</p>";
//     card += "<p class='card-text'><small>" + "Last Updated: "+body.updatedAt + "</small></p>";
//     card += "</div>";
//     card += "<div class='card-footer'><small>"+"System ID: "+body._id +"</small></div>"
//     card += "<button onclick='clickUpdateToDo(\"" +body._id+ "\")' class='radio btn btn-primary'>Click to Update</button>"
//     card += "<br>";
//     card += "</div>";

//     // Append the new item card to the item section section div
//     editCardData = body;
//     console.log(editCardData);
//     $("#editId").append(card)
// };