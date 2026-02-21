//get all + and - buttons
const plusButtons = document.querySelectorAll(".plus");
const minusButtons = document.querySelectorAll(".minus");

//increases the quantity, loops through each + button
plusButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const quantityElement = button.parentElement.querySelector(".quantity"); //navigates to the parent container, then find the quantity
        let currentValue = parseInt(quantityElement.textContent); //converts text content (string) into a number

        currentValue++; //increase value by 1
        quantityElement.textContent = currentValue; //updates the displayed quantity

    });
});

//decreases quantity (but not below 0, no negative values), loops through each - button
minusButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const quantityElement = button.parentElement.querySelector(".quantity");
        let currentValue = parseInt(quantityElement.textContent);

        if (currentValue > 0) { //prevents quantity from going below zero
            currentValue--;
            quantityElement.textContent = currentValue;
        }

    });
});

//selects all selectable circles
const selectCircles = document.querySelectorAll(".select-circle");

//toggles the "selected" class when clicked
//classList.toggle automatically adds or removes the class
selectCircles.forEach(function(circle) {
    circle.addEventListener("click", function() {
        circle.classList.toggle("selected");
    });
});

//gets all important elements for checkout and modal control
const checkoutButton = document.querySelector(".checkout-btn");
const modal = document.getElementById("orderModal");
const closeModalButton = document.querySelector(".close-modal");
const orderDetails = document.getElementById("orderDetails");

//handles the checkout process
checkoutButton.addEventListener("click", function() {

    let totalPrice = 0; //stores total order cost
    let summaryHTML = ""; //stores dynamic HTML content

    const drinkBoxes = document.querySelectorAll(".drink-box");

    drinkBoxes.forEach(function(box) { //loops through every drink item

        const isSelected = box.querySelector(".select-circle").classList.contains("selected"); //checks if the drink is selected
        const quantity = parseInt(box.querySelector(".quantity").textContent); 
        
        const name = box.dataset.name; //retrieves custom data attributes from HTML
        const price = parseFloat(box.dataset.price);

        if (isSelected && quantity > 0) { //only calculate if selected and if quantity is greater than 0

            let itemTotal = quantity * price;
            totalPrice += itemTotal;

            //adds to the end the item summary to HTML string
            summaryHTML += `
                <p>
                    ${name} × ${quantity} = ₱${itemTotal.toFixed(2)}
                </p>
            `;
        }

    });

    //If no items were selected
    if (summaryHTML === "") {
        summaryHTML = "<p>No items selected.</p>";
    } else {
        // adds to the end the total price and user information from localStorage
        summaryHTML += `<hr><p><strong>Total: ₱${totalPrice.toFixed(2)}</strong></p>` +
        `<p class="info">Username: <span>${localStorage.getItem("username")}</span></p>`+
        `<p class="info">Full Name: <span>${localStorage.getItem("fname")} ${localStorage.getItem("lname")} </span></p>` +
        `<p class="info">Email: <span>${localStorage.getItem("email")}</span></p>` +
        `<p class="info">Contact Number: <span>${localStorage.getItem("num")}</span></p>` +
        `<p class="info">Location: <span>${localStorage.getItem("location")}</span></p>`;

    }

    orderDetails.innerHTML = summaryHTML; //inserts the generated HTML into the modal
    modal.style.display = "block"; //makes the modal visible

});

//closes the modal when user clicks close button
closeModalButton.addEventListener("click", function() {
    modal.style.display = "none";
});

//simple login protection
//redirects user if no username is stored in localStorage
if (!localStorage.getItem("username")) {
    alert("Please log in first");
    window.location.href = "LogIn.html";
}