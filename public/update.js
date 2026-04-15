const form = document.getElementById("edit"); //gets user input from the form from Custom.html

form.addEventListener("submit", function(e) { //triggers an event when the 'submit' button was clicked
    e.preventDefault(); 

    const disname = document.getElementById("disname").value; //assigns the user input into usable data
    const age = document.getElementById("age").value;
    const caption = document.getElementById("caption").value;

    const fileInput = document.getElementById("profilePicInput");
    const file = fileInput.files[0];

    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value; 
    const fname = document.getElementById("fname").value; 
    const lname = document.getElementById("lname").value; 
    const email = document.getElementById("email").value; 
    const num = document.getElementById("num").value; 
    const location = document.getElementById("location").value;

function saveData(profilePicData) {
    localStorage.setItem("disname", disname);   // sets user input into localStorage (updates profile info)
    localStorage.setItem("age", age);
    localStorage.setItem("caption", caption);
    localStorage.setItem("profilePic", profilePicData);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("email", email);
    localStorage.setItem("num", num);
    localStorage.setItem("location", location);
    
    window.location.href = "Custom.html" //redirects user to Custom.html after updating their profile

}

if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            saveData(event.target.result); // Base64 string
        };
        reader.readAsDataURL(file);
    } else {
        const existingPic = localStorage.getItem("profilePic") || "images/profile.png";
        saveData(existingPic);
    }
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

const fileInput = document.getElementById("profilePicInput");
const previewImg = document.getElementById("profilePic");

fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImg.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});