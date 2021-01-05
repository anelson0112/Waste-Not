//user and location api's   slash location slash users from spreadsheet

//*********here is my first stab at api calls
//*********here is my first stab at api calls
//*********here is my first stab at api calls

//***** ADD USER      ADD USER     ADD USER **********
//***** ADD USER      ADD USER     ADD USER **********
//***** ADD USER      ADD USER     ADD USER **********
//***** ADD USER      ADD USER     ADD USER **********

//SERVER SIDE ADD USER
//SERVER SIDE ADD USER
//SERVER SIDE ADD USER

app.post("/users", (request, response) => {
    console.log(request.body);
    let user = new User(request.body);
    user.save((err, item) => {
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        response.sendStatus(200);
    })
});

//CLIENT SIDE ADD USER
//CLIENT SIDE ADD USER
//CLIENT SIDE ADD USER

//this function is used when "submit" is clicked
function clickAddUser(){
       addUser().then(function(body){
          console.log(body); 

     }).catch(function(err){
         console.log(err);
     });
 };

async function addUser(){
 
    let user = {
        name : document.getElementById("personName").value, 
        username : document.getElementById('username').value,
        password : document.getElementById("password").value,
        email : document.getElementById('email').value,
        phone : document.getElementById('phone').value,
        email : document.getElementById('email').value,
//****We need to change User Schema to just role string values... */
        user_role: document.querySelector('input[name="user_role"]:checked').value
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
    return alert('New user added');
    //this code commented out below would reload the appropriate page after the add  
    //window.location.href = 'index.html';
    return true;
}



//***** DELETE USER      DELETE USER     DELETE USER **********
//***** DELETE USER      DELETE USER     DELETE USER **********
//***** DELETE USER      DELETE USER     DELETE USER **********


//SERVER SIDE DELETE USER
//SERVER SIDE DELETE USER
//SERVER SIDE DELETE USER

// *** I'm unsure what we'll use as the key...perhaps email address???  ****
app.delete('/users/email, async (request, response) => {
    try {
        await User.deleteOne({email: request.params.email});
        response.sendStatus(204);
    } catch {
        response.sendStatus(404);
        console.log('Didnt find the user!');
    }
});



//CLIENT SIDE DELETE USER
function clickDeleteToDo(deleteEmail){
        var r = confirm("Continue delete?");
        if (r == true) {
       deleteUser(deleteEmail);
        } else {
        return alert('Delete canceled');
        };
        
    console.log(deleteEmail);
    
         deleteToDo(deleteEmail).then(function(deleteEmail){  
              
            console.log(deleteEmail); 
  
         }).catch(function(err){
             console.log(err);
         });
     };
    
     async function deleteUser(deleteEmail){
            let requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }
            
        const response = await fetch('/users/'+deleteEmail, requestOptions);
        if (response.status != 204){
            throw Error('User not deleted!');
        }
        alert('User delete completed');
        //code below would reload the page after alert is checked
        window.location.href = 'index.html';
        return true;
    };


//*********  MY OLD TODO LIST CODE FOR REFERENCE
//*********  MY OLD TODO LIST CODE FOR REFERENCE
//*********  MY OLD TODO LIST CODE FOR REFERENCE
const mongoose = require('mongoose');
var List = require('./models/ToDo.js'); 
var Item = require('./models/ToDoItem.js'); 
//putting in lodash
var _ = require('lodash');

//load in express
const express = require('express');
const path = require('path');
//new express app and validator
const app =  express();
const { body,validationResult } = require('express-validator');
//load local port 
const port = 3000;
var bodyParser = require('body-parser');
const { response } = require('express');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const mongoDB = 'mongodb+srv://MGengelbach:6zy6RKSSc3p@cluster0.lhqif.mongodb.net/<dbname>?retryWrites=true&w=majority'; 


mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err, client) => {
    if(err) return console.error(err);
    console.log('Connected to database'); 
}); 


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

//use says "use the following middleware!"
app.use(
 //express.static is middleware for delivering static files like html, css, javascript, images, etc.
 express.static(
 //this takes care of relative paths 
 path.join(__dirname, 'Public')));



//opening up server at specific ip adderess and portlocation to listen
//ip addrsses are also known as hostnames
app.listen(port,function(){
    console.log('The server is running at port: '+ port);
});

/*
app.get('/', function(request,response){
    
    response.send('Hello World!\n');
});
*/
app.get('/name', function(request,response){
    
    response.send('Mad!\n');
});

app.get('/items', function(request,response){
    Item.find(function(err,items){
        if (err) return console.error(err);
        response.send(items);
    }); 
});


app.post("/items", (request, response) => {
    console.log(request.body);
    let item = new Item(request.body);
    item.save((err, item) => {
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        response.sendStatus(200);
    })
});

app.delete('/items/:id', async (request, response) => {
    try {
        await Item.deleteOne({_id: request.params.id});
        response.sendStatus(204);
    } catch {
        response.sendStatus(404);
        console.log('didnt find it!');
    }
});

// //New delete?
// app.delete('/items', (request, response) => {
//     console.log(request.body._id);
//     var itemDeleteId = request.body._id;
//     console.log(itemDeleteId);
//    Item.findByIdAndDelete(itemDeleteId,function (err, docs) { 
//         if (err){ 
//             response.sendStatus(404);
//             console.log(err) 
//              console.log('didnt delete it!')
//             } 
//     else{ 
//         console.log("here's the deleted record:"+docs);
//         response.status(204).send({ status: 'Deleted'})
//     } 
//     }); 
// }); 

// THIS GETS THE RECORD TO EDIT
app.get('/items/:id', (request, response) => {
    Item.findOne({_id: request.params.id}).exec((err, item) => {
        if (err) return console.error(err);
        response.send(item);
    })
});

// THIS IS THE POST FUNCTION FOR UPDATING AN EXISTING TO DO
//if I pass the body, remove /:id to match route      /:id
app.patch("/items", (request, response) => {
    console.log(request.body);
    var itemUpdateId = request.body._id;
    var itemUpdateName = request.body.itemName;
    var itemUpdateAssignee = request.body.assignee;
    var itemUpdateItemPriority = request.body.itemPriority;
    var itemUpdateComplete = request.body.completed;
    console.log(itemUpdateId);
    //let updatedItem = new Item(request.body);
   Item.findByIdAndUpdate(itemUpdateId, { 
            itemName : itemUpdateName,
            assignee : itemUpdateAssignee,
            itemPriority : itemUpdateItemPriority,
            completed : itemUpdateComplete
        }, 
         function (err, docs) { 
        if (err){ 
            console.log(err) 
            } 
    else{ 
        console.log("here's the old record:"+docs);
        response.status(200).send({ status: 'OK'})
    } 
    }); 
}); 







