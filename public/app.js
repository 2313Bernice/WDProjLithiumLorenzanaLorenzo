const start = document.getElementById("start");
const stop1 = document.getElementById("stop1");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

if (start && stop1 && reset && timer) {
    let timeLeft = 1500;
    let interval = null;

const updateTimer = () =>{
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft % 60;

    timer.innerHTML = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;

};

const startTimer = () => {
    if (interval) return;
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0){
            clearInterval(interval);
            alert("Time's up!");
            timeLeft = 1500;
            updateTimer();
        }
    }, 1000);
};

const stopTimer = () => {
    clearInterval(interval);
    interval = null;
};

const resetTimer = () => {
    clearInterval(interval);
    timeLeft = 1500;
    updateTimer();
};

start.addEventListener("click", startTimer);
stop1.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

updateTimer();}
