
if (!localStorage.getItem("username")) {
    alert("Please log in first");
    window.location.href = "LogIn.html";
}

function logOut(event) {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "LogIn.html";
}

document.getElementById("displayName").textContent = localStorage.getItem("disname");
document.getElementById("age").textContent = localStorage.getItem("age");
document.getElementById("caption").textContent = localStorage.getItem("caption");

document.getElementById("profilePic").src = localStorage.getItem("profilePic");
document.getElementById("username").textContent = localStorage.getItem("username");
document.getElementById("password").textContent = localStorage.getItem("password");
document.getElementById("fullname").textContent = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
document.getElementById("email").textContent = localStorage.getItem("email");
document.getElementById("num").textContent = localStorage.getItem("num");
document.getElementById("location").textContent = localStorage.getItem("location");


