const timerElement = document.getElementById("timer");
const statusElement = document.getElementById("status");

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

const studyTimeElement = document.getElementById("inputStudy");
const pauseTimeElement = document.getElementById("inputPause");
const studyCyclesElement = document.getElementById("inputCycles");

const pomodoroImg = document.getElementById("pomodoro-img");

const defaultMinutes = 5;
const defaultSeconds = 0;
const nullSeconds = 0;
const defaultPause = 1;
const defaultCycles = 1;
const TIMER_PERIOD = 1000;
// const n = 0;

let studyTime, pauseTime, cycles;
let minutes, seconds, interval, isStudySession;

let statusList = {
	BEGIN: "BEGIN SESSION!",
	STUDY: "STUDY",
	END: "END OF SESSION",
	PAUSE: "PAUSE",
};

statusElement.innerText = statusList.BEGIN;

function disableInputs(isDisabled) {
	startButton.disabled = isDisabled;
	stopButton.disabled = !isDisabled;

	studyTimeElement.disabled = isDisabled;
	pauseTimeElement.disabled = isDisabled;
	studyCyclesElement.disabled = isDisabled;
}

function updateTimerText() {
	timerElement.innerText = pad(minutes) + ":" + pad(seconds);
}

function startAnimation(n) {
	if (n==0){
    // Converti il tempo di studio da minuti a millisecondi per la durata dell'animazione
    const durataAnimazione = studyTime * 60 * 1000;
    // Applica la durata dell'animazione al pomodoro
    pomodoroImg.style.animationDuration = `${durataAnimazione}ms`;
    // Aggiungi la classe CSS per l'animazione
    pomodoroImg.classList.add("rotateStudy");
	}
	else if (n==1){
	// Converti il tempo di studio da minuti a millisecondi per la durata dell'animazione
	const durataAnimazione = pauseTime * 60 * 1000;
	// Applica la durata dell'animazione al pomodoro
	pomodoroImg.style.animationDuration = `${durataAnimazione}ms`;
	// Aggiungi la classe CSS per l'animazione
	pomodoroImg.classList.add("rotateBreak");
	}
}

function endAnimation(n){
	if (n==0){
	pomodoroImg.classList.remove("rotateStudy");
	}
	else if (n==1){
	pomodoroImg.classList.remove("rotateBreak");
	}
}

function startTimer() {
    isStudySession = true;
    disableInputs(true);
    cycles--;

    initData();

    console.log("Start!", studyTime, pauseTime, cycles);

    statusElement.innerText = statusList.STUDY;
    timer = setInterval(updateTimer, TIMER_PERIOD);
    startAnimation(0); // Avvia l'animazione
}

function stopTimer() {
    clearInterval(timer);
    minutes = studyTime;
    seconds = nullSeconds;
    disableInputs(false);
    statusElement.innerText = statusList.END;

    console.log("Stop!", studyTime, pauseTime, cycles);
    timerElement.innerText = "";

    // Rimuovi l'animazione al termine del timer
	endAnimation(1);
}

function updateTimer() {
	seconds--;
	if (seconds < 0) {
		seconds = 59;
		minutes--;
	}
	console.log(minutes, seconds, "Residual cycles: " + cycles, isStudySession ? "Study" : "Pause");
	if (minutes < 0) {
		// End of session
		if (!cycles) {
			stopTimer();
			return;
		}
		// There are residual sessions
		if (isStudySession) {
			// End of study session, enter pause
			isStudySession = false;
			endAnimation(0);
			startAnimation(1);
			statusElement.innerText = statusList.PAUSE;
			minutes = pauseTime;
			seconds = nullSeconds;
		} else {
			// End of pause session, start next study session
			isStudySession = true;
			endAnimation(1);
			startAnimation(0);
			statusElement.innerText = statusList.STUDY;
			minutes = studyTime;
			seconds = nullSeconds;
			cycles--;
		}
	}
	timerElement.innerText = pad(minutes) + ":" + pad(seconds);
}

function pad(value) {
	return value < 10 ? "0" + value : value;
}

startButton.addEventListener("click", () => {
	startTimer();
});

stopButton.addEventListener("click", () => {
	stopTimer();
	if (isStudySession){
	endAnimation(0);
	}
	else{
		endAnimation(1);
	}
});

document.getElementById("inputStudy").addEventListener("change", function () {
	minutes = studyTime = parseInt(this.value) || defaultMinutes;
});
document.getElementById("inputPause").addEventListener("change", function () {
	pauseTime = parseInt(this.value) || defaultPause;
});
document.getElementById("inputCycles").addEventListener("change", function () {
	cycles = parseInt(this.value) || defaultCycles;
});

function initData() {
	studyTime = parseInt(studyTimeElement.value) || defaultMinutes;
	pauseTime = parseInt(pauseTimeElement.value) || defaultPause;
	cycles = parseInt(studyCyclesElement.value) || defaultCycles;
	minutes = studyTime;
	seconds = nullSeconds;
	updateTimerText();
}
