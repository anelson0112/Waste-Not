// require('dotenv').config();
// const express = require('express')
// const app = express()
// const bcrypt = require('bcrypt')
// const methodOverride = require('method-override')
// const jwt = require ('jsonwebtoken')
// const bodyParser = require("body-parser");
// const JWT_Secret = process.env.JWT_SECRET;
// const JWT_Refresh = process.env.REFRESH_JWT_SECRET;




//require mongoose-translates Node.js
// const mongoose = require ("mongoose");
// mongoose.set('useFindAndModify', false);
//returns object AFTER update was applied
// mongoose.set('returnOriginal', false);

//call in schema models
// var User = require ("./models/userDatabase.js");

//add path library
// const path = require("path");
// const { response } = require('express');
// const { default: jwtDecode } = require('jwt-decode');

//declare port to connect t0
// const port = 3000;

//connect to Atlas cluster
// const mongoLogIn = process.env.mongoInfo
// const mongoDB = 'mongodb+srv://'+ mongoLogIn;


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
    
});
