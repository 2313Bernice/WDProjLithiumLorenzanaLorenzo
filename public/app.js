const start = document.getElementById("start"); // start button
const stop1 = document.getElementById("stop1"); // stop button
const reset = document.getElementById("reset"); // reset button
const timer = document.getElementById("timer"); // timer display

if (start && stop1 && reset && timer) { //makes sure that all elements exist before running the timer logic
    let timeLeft = 1500;                // total time in seconds (25 min)
    let interval = null;                // variable to store the interval ID for setInterval

const updateTimer = () =>{                    //function to update timer display
    const minutes = Math.floor(timeLeft/60);  // calcualte remaining mins
    const seconds = timeLeft % 60;            // calculate remaining secs

    timer.innerHTML = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
    //displays the time in MM:SS format, padding with 0 if needed
};

const startTimer = () => {               //function to start the timer countdown
    if (interval) return;                // prevent multiple intervals from running at the same time
    interval = setInterval(() => {
        timeLeft--;                      // decreases time by 1 second
        updateTimer();                   // updates the displayed timer

        if (timeLeft === 0){             //when timer reaches 0, it stops the timer, notify the user, and resets the time to 25 min
            clearInterval(interval);
            alert("Time's up!");
            timeLeft = 1500;
            updateTimer();               //lastly updates the display
        }
    }, 1000);                            // run every 1000s (1 second)
};

const stopTimer = () => {    //function to stop/pause the timer
    clearInterval(interval); // clears interval
    interval = null;         // reset interval to allow restarting
};

const resetTimer = () => {   //function to reset the timer to its initial value
    clearInterval(interval); // stop any running timer
    timeLeft = 1500;         // resets time to 25 mins
    updateTimer();           // updates the display
};

//adds click event listeners to the buttons
start.addEventListener("click", startTimer);
stop1.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

updateTimer();} // initialize the timer display when page loads
