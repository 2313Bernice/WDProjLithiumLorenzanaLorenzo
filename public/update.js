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

if (file) { //checks if the user selected a new profile image

        const reader = new FileReader(); //creates a FileReader object to convert the image file
        reader.onload = function(event) {
            saveData(event.target.result); //converts the image to a Base64 string and saves it
        };
        reader.readAsDataURL(file);

    } else { //if no new image is selected, retain the existing profile picture
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

const fileInput = document.getElementById("profilePicInput"); //retrieves elements for handling live image preview
const previewImg = document.getElementById("profilePic");

fileInput.addEventListener("change", function () {           //detects when the user selects an image file
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();                     //creates a FileReader to display the selected image

        reader.onload = function (e) {
            previewImg.src = e.target.result;                //updates the image source to display a preview before saving
        };

        reader.readAsDataURL(file);                          //converts the selected file into a displayable format (Base64)
    }
});