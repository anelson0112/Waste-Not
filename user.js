use strict;

class User {
     constructor(name, username, password, email, phone, user_role){
    let this.name=name;
    let this.username=username;
    let this.password = password;
    let this.email = email;
    let this.phone=phone;
    let this.user_role = user_role;
    };
    
    function addUser_BackS (){};
    //check to see if current user is an admin. if so, can proceed, else error message
    //Input lines for all "this" fields
    //Submit button
    //Need completion checks, if all complete, Alert confirming add
    //show/hide function w button.

    function deleteUser_BackS(){};
    ////check to see if current user is an admin. if so, can proceed, else error message
    //Input field for Name is focus - rest are either not showing or greyed out
    //Submit button
    //User info in all fields is populated for review.
    //Delete User button - when pressed, Alert "are you sure?" - if yes, deleted, no, back to main menu
    //one more Alert to confirm deletion - return to menu.
    //show/hide function w button.

    function modifyUser_BackS(){};
    ////check to see if current user is an admin. if so, can proceed, else error message
    //Input field for Name is focus - rest are either not showing or greyed out
    //Submit button
    //User info in all fields is populated for review.
    //Input lines for all "this" fields are editable. Note shows: "Make changes below:"
    //Submit button for when changes are done.
    //Alert to confirm modifications, showing mods made with from/to for relevant fields 
    //show/hide function w button.

    function modifyMyUserInfo_BackS(){};
    //Used to modify my own personal information, not others; for ALL Roles
    //Use log in info to feed the function
    //User info in all fields is populated for review.
    //Input lines for all "this" fields EXCEPT FOR User Role are editable. Note shows: "Make changes below:"
    //Submit button for when changes are done.
    //Alert to confirm modifications, showing mods made with from/to for relevant fields 
    //if Alert/Confirm clicks yes, modified, no, back to main menu
    //show/hide function w button.