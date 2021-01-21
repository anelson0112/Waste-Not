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
 return body;
 //this code reloads the appropriate page after the add  
 window.location.href = 'user-updates.html';

}