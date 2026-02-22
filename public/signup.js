const form = document.getElementById("sform"); //gets user input from the form from SignUp.html

form.addEventListener("submit", function(e) {  //triggers an event when the 'submit' button was clicked
    e.preventDefault();   

    const username = document.getElementById("username").value;   //assigns the user input into usable data
    const password = document.getElementById("password").value; 
    const fname = document.getElementById("fname").value; 
    const lname = document.getElementById("lname").value; 
    const email = document.getElementById("email").value; 
    const num = JSON.stringify(document.getElementById("num").value); 
    const location = JSON.stringify(document.getElementById("location").value);


    localStorage.setItem("username", username);    //sets user input into localStorage (saves account info)
    localStorage.setItem("password", password);
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("email", email);
    localStorage.setItem("num", JSON.parse(num));
    localStorage.setItem("location", JSON.parse(location));

    window.location.href = "LogIn.html";  //redirects user to login page after signing up


});

function inStyle(ele){  //styles the input box when the user is interacting with it
    console.log(ele);
    ele.style.backgroundColor = "rgb(37, 111, 80)";
    ele.style.color="white";
}

function outStyle(ele){   //styles the input box when the user is not interacting with it
    console.log(ele);
    ele.style.backgroundColor = "rgb(242, 242, 255)";
     ele.style.color="black";
    
}