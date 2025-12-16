// for changing background images:

const imageUrls = [  //list of background images that will cycle when the button is clicked
    "../Assets/change1.png",
    "../Assets/change2.jpeg",
    "../Assets/change3.png",
    "../Assets/change4.jpeg"
];

let currentIndex = 0;                                    //keeps track of the current background image
const targetElement = document.body;                     //the element whose background will change
const button = document.getElementById('bgImageBtn');    //button that changes background

function changeBackground() {   //function that changes the background image
    targetElement.style.backgroundImage = `url("${imageUrls[currentIndex]}")`;    //sets the background image using the current index
    targetElement.style.backgroundSize = 'cover';                                 //ensures the image covers the screen properly
    targetElement.style.backgroundPosition = 'center';
    targetElement.style.backgroundRepeat = 'no-repeat';

    currentIndex = (currentIndex + 1) % imageUrls.length;    //moves to the next image, wherein modulo (%) makes it loop back to the first image after the last one
}

button.addEventListener('click', changeBackground);    //runs changeBackground when the button is clicked

changeBackground();     //sets an initial background when the page loads


// for changing background musics:

const sounds = [
    "../Assets/sound1.mp3",    //list of background music tracks
    "../Assets/sound2.mp3",
    "../Assets/sound3.mp3"
];

let soundIndex = 0;                             //keeps track of the current sound
const bgAudio = new Audio(sounds[soundIndex]);  //creates an audio object
bgAudio.loop = true;                            //loops the music continuously
 
document.getElementById("bgSoundBtn").addEventListener("click", () => {
    bgAudio.pause(); //stop the current sound

    soundIndex = (soundIndex + 1) % sounds.length;  //moves to the next sound in the list

    bgAudio.src = sounds[soundIndex];               //change the audio source
    bgAudio.play();                                 //plays the new sound
});

