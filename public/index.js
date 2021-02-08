//function to display admin section
function displayAdmin(){
//if admin yes do this
    document.getElementById("login").style.display = "none";
    document.getElementById("admin").style.display = "block";
}
//function to display worker menu
function displayWorkDayMenu(){
    //if barista do this
    document.getElementById("login").style.display = "none";
    document.getElementById("workDayMenu").style.display = "block";
}
//function to display baker menu
function displayBakerMenu(){

    //if baker do this
    document.getElementById("login").style.display = "none";
    document.getElementById("bakerSection").style.display = "block"; 
}
//function to go back to log in
function backToLogIn(){
    document.getElementById("bakerSection").style.display = "none";
    document.getElementById("workDayMenu").style.display = "none"; 
    document.getElementById("admin").style.display = "none";
    document.getElementById("login").style.display = "block";

}