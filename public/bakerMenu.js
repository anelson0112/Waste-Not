document.getElementById("logOut").addEventListener('click', function(event){
    event.preventDefault();
    location.href = "index.html";
    localStorage.clear();
});