let startTime = 0;
let running = false;
let lapTimes = [];
let timerInterval;

const stopwatch = document.querySelector(".stopwatch");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.querySelector("#laps ul");

startStopButton.addEventListener("click", toggleStartStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", recordLap);

function toggleStartStop() {
  if (running) {
    clearInterval(timerInterval);
    startStopButton.textContent = "Start";
  } else {
    startTime =
      Date.now() - (lapTimes.length > 0 ? lapTimes[lapTimes.length - 1] : 0);
    timerInterval = setInterval(updateTime, 10);
    startStopButton.textContent = "Stop";
  }
  running = !running;
}

function reset() {
  clearInterval(timerInterval);
  lapTimes = [];
  stopwatch.textContent = "00:00:00.000";
  startStopButton.textContent = "Start";
  running = false;
  lapList.innerHTML = "";
}

function recordLap() {
  if (running) {
    const lapTime = Date.now() - startTime;
    lapTimes.push(lapTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = formatTime(lapTime);
    lapList.appendChild(lapItem);
  }
}

function updateTime() {
  const currentTime = Date.now() - startTime;
  stopwatch.textContent = formatTime(currentTime);
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = date.getUTCMilliseconds();

  return (
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds +
    "." +
    (milliseconds < 100 ? "0" : "") +
    (milliseconds < 10 ? "0" : "") +
    milliseconds
  );
}
