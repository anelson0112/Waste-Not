async function sendEmail(){
    
    let newUser = {
        name : this.document.getElementById("name").value,
        email: this.document.getElementById("email").value,
    }

    let requestOptions = {
        method : "POST",
        body : JSON.stringify(newUser),
        headers : {"Content-Type" : "application/json"},
    }

    const response = await fetch('/sendemail/newUser', requestOptions);
    const body = await response.json();

    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
};

function notifyNewUser(){
    sendEmail().then(function (user){
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
    }).catch(function(error){
        console.log(error);
    });
};

document.getElementById("registerButton").addEventListener("click", function (event){
    notifyNewUser();
})