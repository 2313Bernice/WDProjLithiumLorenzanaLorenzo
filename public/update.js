const form = document.getElementById("edit"); //gets user input from the form from Custom.html

form.addEventListener("submit", function(e) { //triggers an event when the 'submit' button was clicked
    e.preventDefault(); 

    const disname = document.getElementById("disname").value; //assigns the user input into usable data
    const age = document.getElementById("age").value;
    const caption = document.getElementById("caption").value;
    const profilePic = document.getElementById("profilePic").src;
    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value; 
    const fname = document.getElementById("fname").value; 
    const lname = document.getElementById("lname").value; 
    const email = document.getElementById("email").value; 
    const num = JSON.stringify(document.getElementById("num").value); 
    const location = JSON.stringify(document.getElementById("location").value);

    localStorage.setItem("disname", disname);   // sets user input into localStorage (updates profile info)
    localStorage.setItem("age", age);
    localStorage.setItem("caption", caption);
    localStorage.setItem("profilePic", profilePic);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("email", email);
    localStorage.setItem("num", num);
    localStorage.setItem("location", location);

    
    window.location.href = "Custom.html" //redirects user to Custom.html after updating their profile

});


const cancel = document.getElementById("cancel");   //redirects user back to Custom.html without saving input info
cancel.addEventListener("click", function() {
    window.location.href = "Custom.html";
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