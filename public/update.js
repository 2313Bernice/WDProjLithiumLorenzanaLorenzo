const form = document.getElementById("edit");

form.addEventListener("submit", function(e) { 
    e.preventDefault(); 

    const disname = document.getElementById("disname").value;
    const age = document.getElementById("age").value;
    const caption = document.getElementById("caption").value;

    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value; 
    const fname = document.getElementById("fname").value; 
    const lname = document.getElementById("lname").value; 
    const email = document.getElementById("email").value; 
    const num = JSON.stringify(document.getElementById("num").value); 
    const location = JSON.stringify(document.getElementById("location").value);

    localStorage.setItem("disname", disname);
    localStorage.setItem("age", age);
    localStorage.setItem("caption", caption);

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("email", email);
    localStorage.setItem("num", num);
    localStorage.setItem("location", location);

    
    window.location.href = "Custom.html"


});