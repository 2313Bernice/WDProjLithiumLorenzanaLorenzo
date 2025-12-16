const imageUrls = [
    "../Assets/change1.png",
    "../Assets/change2.jpeg",
    "../Assets/change3.png",
    "../Assets/change4.jpeg"
];

let currentIndex = 0;
const targetElement = document.body;
const button = document.getElementById('bgImageBtn');

function changeBackground() {
    targetElement.style.backgroundImage = `url("${imageUrls[currentIndex]}")`;
    targetElement.style.backgroundSize = 'cover';
    targetElement.style.backgroundPosition = 'center';
    targetElement.style.backgroundRepeat = 'no-repeat';

    currentIndex = (currentIndex + 1) % imageUrls.length;
}

button.addEventListener('click', changeBackground);

changeBackground();

const sounds = [
    "../Assets/sound1.mp3",
    "../Assets/sound2.mp3",
    "../Assets/sound3.mp3"
];

let soundIndex = 0;
const bgAudio = new Audio(sounds[soundIndex]);
bgAudio.loop = true;

document.getElementById("bgSoundBtn").addEventListener("click", () => {
    bgAudio.pause();
    soundIndex = (soundIndex + 1) % sounds.length;
    bgAudio.src = sounds[soundIndex];
    bgAudio.play();
});

