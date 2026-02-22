const form = document.getElementById("lform"); //gets user input from the form from LogIn.html

form.addEventListener("submit", function(e) { //triggers an event when the 'submit' button was clicked
    e.preventDefault(); 

    const logUser = document.getElementById("username").value;      //assigns the user input into usable data
    const logPass = document.getElementById("password").value; 

    const storUser = localStorage.getItem("username");        //gets the stored values from localStorage 
    const storPass = localStorage.getItem("password");

   //compares data from LogIn.html and localStorage for account validation
    if (logUser === storUser && logPass === storPass){   //if the log in is valid, it brings the user to Custom.html
        localStorage.setItem("loggedIn", "true");  //sets loggedIn to true when user logs in successfully
        window.location.href = "Custom.html";             
    }

    else{     //if log in fails, it alerts the user
        alert("Invalid user or password");
    }
        
    

});

function inStyle(ele){    //styles the input box when the user is interacting with it
    console.log(ele); 
    ele.style.backgroundColor = "rgb(37, 111, 80)";
    ele.style.color="white";
}

function outStyle(ele){ //styles the input box when the user is not interacting with it
    console.log(ele);
    ele.style.backgroundColor = "rgb(242, 242, 255)";
     ele.style.color="black";
    
}