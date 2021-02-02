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

// route which captures form details and sends it to your personal mail
app.post('/sendemail',(req,res,next)=>{
    console.log(req.body)
    /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
    here we are using gmail as our service
    In Auth object , we specify our email and password
    */
   var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5ba0b7386d7850",
      pass: "e15c26797c9e26"
    }
  });
    /*
    In mailOptions we specify from and to address, subject and HTML content.
    In our case , we use our personal email as from and to address,
    Subject is Contact name and
    html is our form details which we parsed using bodyParser.
    */
    var mailOptions = {
    from: 'yourmail@gmail.com',//replace with your email
    to: 'yourmail@gmail.com',//replace with your email
    subject: `Running low on- ${req.body.itemName}`,
    html:`<h1>Contact details</h1>
    <h2> name:${req.body.name} </h2><br>
    <h2> email:${req.body.email} </h2><br>
    <h2> phonenumber:${req.body.phonenumber} </h2><br>
    <h2> ${req.body.itemName} </h2><br><p>Running low and needs restockig</p>`
    };
    /*
     Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
    call back as parameter
    */
    transport.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    res.send('error') // if error occurs send error as response to client
    }
    else {
    console.log('Email sent: ' + info.response);
    res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
    }
    });
    })
    
