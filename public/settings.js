const imageUrls = [
    "../Assets/change1.png",
    "../Assets/change2.jpeg",
    "../Assets/change3.png",
    "../Assets/change4.jpeg"
];

let currentIndex = 0;
const targetElement = document.body;
const button = document.getElementById('changeButton');

function changeBackground() {
    targetElement.style.backgroundImage = `url("${imageUrls[currentIndex]}")`;
    targetElement.style.backgroundSize = 'cover';
    targetElement.style.backgroundPosition = 'center';
    targetElement.style.backgroundRepeat = 'no-repeat';

    currentIndex = (currentIndex + 1) % imageUrls.length;
}

button.addEventListener('click', changeBackground);

// Set initial background
changeBackground();