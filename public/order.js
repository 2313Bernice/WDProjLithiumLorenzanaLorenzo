const plusButtons = document.querySelectorAll(".plus");
const minusButtons = document.querySelectorAll(".minus");

plusButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const quantityElement = button.parentElement.querySelector(".quantity");
        let currentValue = parseInt(quantityElement.textContent);

        currentValue++;
        quantityElement.textContent = currentValue;

    });
});

minusButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const quantityElement = button.parentElement.querySelector(".quantity");
        let currentValue = parseInt(quantityElement.textContent);

        if (currentValue > 0) {
            currentValue--;
            quantityElement.textContent = currentValue;
        }

    });
});

const selectCircles = document.querySelectorAll(".select-circle");

selectCircles.forEach(function(circle) {
    circle.addEventListener("click", function() {
        circle.classList.toggle("selected");
    });
});
const checkoutButton = document.querySelector(".checkout-btn");
const modal = document.getElementById("orderModal");
const closeModalButton = document.querySelector(".close-modal");
const orderDetails = document.getElementById("orderDetails");

checkoutButton.addEventListener("click", function() {

    let totalPrice = 0;
    let summaryHTML = "";

    const drinkBoxes = document.querySelectorAll(".drink-box");

    drinkBoxes.forEach(function(box) {

        const isSelected = box.querySelector(".select-circle").classList.contains("selected");
        const quantity = parseInt(box.querySelector(".quantity").textContent);
        const name = box.dataset.name;
        const price = parseFloat(box.dataset.price);

        if (isSelected && quantity > 0) {

            let itemTotal = quantity * price;
            totalPrice += itemTotal;

            summaryHTML += `
                <p>
                    ${name} × ${quantity} = ₱${itemTotal.toFixed(2)}
                </p>
            `;
        }

    });

    if (summaryHTML === "") {
        summaryHTML = "<p>No items selected.</p>";
    } else {
        summaryHTML += `<hr><p><strong>Total: ₱${totalPrice.toFixed(2)}</strong></p>`;
    }

    orderDetails.innerHTML = summaryHTML;
    modal.style.display = "block";

});

closeModalButton.addEventListener("click", function() {
    modal.style.display = "none";
});