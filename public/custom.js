
if (!localStorage.getItem("loggedIn") || localStorage.getItem("loggedIn") !== "true") {    //Checks if the user is logged in by checking if loggedIn is true
    alert("Account not logged in. Please log in first.");  //If not logged in, the user is alerted to log in first
    window.location.href = "LogIn.html"; //Redirects the user to the login page
}

function logOut(event) {           //Allows the user to log off.
    event.preventDefault();
    localStorage.setItem("loggedIn", "false");  //sets loggedIn to false when user logs out without deleting data from localStorage (keeps account info)
    window.location.href = "LogIn.html"; //Redirects the user to the login page
}


//Displays user information by retrieving data from localStorage and inserting it into its designated HTML element
document.getElementById("profilePic").src = localStorage.getItem("profilePic");            
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


