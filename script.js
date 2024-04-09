const timerElement = document.getElementById("timer");
const statusElement = document.getElementById("status");
const paragraph = document.querySelector(".paragraph");
const pomodoroElement = document.querySelector(".pomodoro");
const pomodoroImage = document.querySelector("img");

const ring = document.getElementById("ring");

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
	pomodoroElement.classList.remove("animate-pomodoro");
	pomodoroElement.classList.remove("reverse-animate-pomodoro");
	if (isStudySession) {
		pomodoroElement.style.animationDuration = (studyTimeElement.value * 60) + "s";
		pomodoroElement.classList.add("animate-pomodoro");
	}

	if (!isStudySession) {
		pomodoroElement.style.animationDuration = (pauseTimeElement.value * 60) + "s";
		pomodoroElement.classList.add("reverse-animate-pomodoro");

	}
}



function startTimer() {
	isStudySession = true;
	disableInputs(true);

	initData();
	cycles--; // reduce cycles number to align loop

	statusElement.innerText = statusList.STUDY;
	timer = setInterval(updateTimer, 1000);

}

function stopTimer() {
	clearInterval(timer);
	minutes = studyTime;
	seconds = nullSeconds;
	disableInputs(false);
	statusElement.innerText = statusList.END;
	timerElement.innerText = "";
	resetPomodoroColor();
}

function updateTimer() {

	seconds--;
	if (seconds < 0) {
		seconds = 59;
		minutes--;
	}
	//console.log(minutes, seconds, "Residual cycles: " + cycles, isStudySession ? "Study" : "Pause");
	if (minutes < 0) {

		// End of session
		if (cycles == 0) {
			stopTimer();
			return;
		}
		// There are residual sessions
		if (isStudySession) {
			// End of study session, enter pause
			statusElement.innerText = statusList.PAUSE;
			isStudySession = false;
			//fai partire il suono del campanello quando comincia la pausa
			ring.play();
			//esegui l'animazione al contrario (verde -> rosso)
			startAnimation();
			minutes = pauseTime;
			seconds = nullSeconds;
		} else {
			// End of pause session, start next study session
			isStudySession = true;
			//fai partire il suono del campanello quando comincia lo studio
			ring.play();
			//esegui l'animazione standard (rosso -> verde)
			startAnimation();
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

function initData() {
	studyTime = parseInt(studyTimeElement.value);
	pauseTime = parseInt(pauseTimeElement.value);
	cycles = parseInt(studyCyclesElement.value);
	minutes = studyTime;
	seconds = nullSeconds;
	updateTimerText();
}

function inputCheck() {
	const isStudyTimeValid = studyTimeElement.value && !isNaN(studyTimeElement.value) && Number.isInteger(parseFloat(studyTimeElement.value)) && studyTimeElement.value > 0 && studyTimeElement.value < 100;
	const isPauseTimeValid = pauseTimeElement.value && !isNaN(pauseTimeElement.value) && Number.isInteger(parseFloat(pauseTimeElement.value)) && pauseTimeElement.value > 0 && pauseTimeElement.value < 100;
	const isStudyCyclesValid = studyCyclesElement.value && !isNaN(studyCyclesElement.value) && Number.isInteger(parseFloat(studyCyclesElement.value)) && studyCyclesElement.value > 0 && studyCyclesElement.value < 100;

	return isStudyTimeValid && isPauseTimeValid && isStudyCyclesValid;
}

function resetPomodoroColor() {
	// Imposta la durata dell'animazione su un valore molto breve
	pomodoroElement.style.animationDuration = "0.1s";
	pomodoroElement.classList.add("animate-pomodoro");
	setTimeout(() => {
		pomodoroElement.classList.remove("animate-pomodoro");
	}, 100);
}

startButton.addEventListener("click", () => {
	if (inputCheck()) {
		paragraph.innerText = " ";
		//fai il suono del campanello se inizio una sessione
		ring.play();
		startTimer();
		startAnimation();

	}

	else {
		paragraph.innerText = "INSERT AN INTEGER NUMBER FOR STUDY TIME, PAUSE TIME AND STUDY CYCLES! (1-99)";
	}

});

stopButton.addEventListener("click", () => {
	//fai il suono del campanello se fermo il pomodoro
	ring.play();
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

