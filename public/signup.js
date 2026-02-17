const form = document.getElementById("sform");

form.addEventListener("submit", function(e) { 
    e.preventDefault(); 

    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value; 
    const fname = document.getElementById("fname").value; 
    const lname = document.getElementById("lname").value; 
    const email = document.getElementById("email").value; 
    const num = JSON.stringify(document.getElementById("num").value); 
    const location = JSON.stringify(document.getElementById("location").value);


    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("email", email);
    localStorage.setItem("num", num);
    localStorage.setItem("location", location);

    window.location.href = "login.html"


});

function inStyle(ele){
    console.log(ele);
    ele.style.backgroundColor = "rgb(37, 111, 80)";
    ele.style.color="white";
}

function outStyle(ele){
    console.log(ele);
    ele.style.backgroundColor = "rgb(242, 242, 255)";
     ele.style.color="black";
    
}