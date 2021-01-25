//const lookupEmail = document.getElementById('editEmail').value;


//CLIENT SIDE ADD USER
//CLIENT SIDE ADD USER
//CLIENT SIDE ADD USER

function clickAddUserByAdmin(){
    addUser().then(function(body){
       console.log(body); 

  }).catch(function(err){
      console.log(err);
      alert("You are missing a field - all fields are required")
      alert("This email is already taken - please use another email address")
  });
};

async function addUser(){

 let user = {
     name : document.getElementById("editName").value, 
     password : document.getElementById("editPassword").value,
     email : document.getElementById('editEmail').value,
     phone : document.getElementById('editPhone').value,
     user_role: document.querySelector('input[name="editUserRole"]:checked').value

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
    window.location.href = 'user-updates.html';
 return true
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
        var editUserSysId = document.getElementById('editUserSection');
        console.log(showUserRole);
        console.log(body._id)
        
        //User Info into HTML Page
        document.getElementById('editName').value=body.name;
        document.getElementById('editEmail').value=body.email;
        document.getElementById('editPhone').value=body.phone;
        document.getElementById('editPassword').value=body.password;
        editUserSysId.setAttribute('data-id',body._id);
        console.log("Here's the system id "+document.getElementById('editUserSection').getAttribute('data-id'));
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
         alert('Email not found in database');
         window.location.href = 'user-updates.html';
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

//CLIENT SIDE DELETE USER
//CLIENT SIDE DELETE USER
//CLIENT SIDE DELETE USER

function clickDeleteUser(deleteId){
   deleteId = document.getElementById('editUserSection').getAttribute('data-id'); 
   //deleteEmail = document.getElementById('editEmail').value;
    var r = confirm("Continue delete?");
    if (r == true) {
        deleteUser(deleteId).then(function(deleteId){  
          
            console.log(deleteId); 
    
         }).catch(function(err){
             console.log(err);
         });
    } else {
    return alert('Delete canceled');
    };
    
console.log(deleteId); 
};

 async function deleteUser(deleteId){
        let requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }
        
    const response = await fetch('/users/'+deleteId, requestOptions);
    if (response.status != 204){
        throw Error('User not deleted!');
    }
    alert('User delete completed');
    window.location.href = 'user-updates.html';
    return true;
};



//CLIENT SIDE EDIT USER
//CLIENT SIDE EDIT USER
//CLIENT SIDE EDIT USER



function clickUpdateUser(editedId){
    editedId = document.getElementById('editUserSection').getAttribute('data-id');
    console.log(editedId);

   
    updateUser(editedId).then(function(body){
             
              console.log(body); 
    
    
             
         }).catch(function(err){
             console.log(err);
         });
     };

async function updateUser(editedId){
   //var newCompleted =  JSON.parse(document.querySelector('input[name="editItemCompleted"]:checked').value);
    console.log(editedId);
    let editedUser = {
        _id: editedId,
        name : document.getElementById("editName").value, 
        password : document.getElementById("editPassword").value,
        email : document.getElementById('editEmail').value,
        phone : document.getElementById('editPhone').value,
        user_role: document.querySelector('input[name="editUserRole"]:checked').value
};
    console.log(editedUser);

    let requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(editedUser),
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/users/'+editedId, requestOptions); //items...handle the Patch call no eed    + editId
    // const response = await fetch('/users', requestOptions); //items...handle the Patch call no eed    + editId
    const body = await response.json();

    if (response.status != 200){
        throw Error('Error - update not saved!');
    }
    alert('Update saved!');
    window.location.href = 'user-updates.html';
    return true;
};