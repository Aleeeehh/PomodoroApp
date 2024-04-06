const timerElement = document.getElementById("timer");
const statusElement = document.getElementById("status");

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

const studyTimeElement = document.getElementById("inputStudy");
const pauseTimeElement = document.getElementById("inputPause");
const studyCyclesElement = document.getElementById("inputCycles");

const defaultMinutes = 5;
const defaultSeconds = 0;
const nullSeconds = 0;
const defaultPause = 1;
const defaultCycles = 1;
const TIMER_PERIOD = 30;

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

function startAnimation() {
	/*converto studyTime da minutes a ms*/
	const durataAnimazione = studyTime.value * 60 * 1000;
	/*aggiungo al pomodoro la classe css "animate-border"*/
	startButton.classList.add("animate-border");
	/*la variazione di colore dura quanto il numero dato in input*/
	startButton.style.animationDuration = `${durataAnimazione}ms`;
}

function startTimer() {
	isStudySession = true;
	disableInputs(true);
	cycles--; // reduce cycles number to align loop

	initData();

	console.log("Start!", studyTime, pauseTime, cycles);

	statusElement.innerText = statusList.STUDY;
	timer = setInterval(updateTimer, TIMER_PERIOD);
}

function stopTimer() {
	clearInterval(timer);
	minutes = studyTime;
	seconds = nullSeconds;
	disableInputs(false);
	statusElement.innerText = statusList.END;

	console.log("Stop!", studyTime, pauseTime, cycles);
	timerElement.innerText = "";
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
			statusElement.innerText = statusList.PAUSE;
			isStudySession = false;
			minutes = pauseTime;
			seconds = nullSeconds;
		} else {
			// End of pause session, start next study session
			isStudySession = true;
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
	// startAnimation();
});

stopButton.addEventListener("click", () => {
	stopTimer();
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
