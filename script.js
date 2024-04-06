
const tempo = document.querySelector(".timer");

const bottoneStart = document.querySelector(".pomodoro");

const studyTime = document.querySelector(".inputStudyTime");

/*inizializzo minuti e secondi a zero */
let minuti = 0;
let secondi = 0;


function decrementaTempo() {
  if (secondi === 0 && minuti === 0) {
    clearInterval(intervallo);
    return;
  }

  if (secondi === 0) {
    minuti--;
    secondi = 59;
  } else {
    secondi--;
  }

  tempo.innerText = `${minuti.toString().padStart(2, '0')}:${secondi.toString().padStart(2, '0')}`;
}

function startAnimation() {
  /*converto studyTime da minuti a ms*/
  const durataAnimazione = studyTime.value * 60 * 1000;
  /*aggiungo al pomodoro la classe css "animate-border"*/
  bottoneStart.classList.add("animate-border");
  /*la variazione di colore dura quanto il numero dato in input*/
  bottoneStart.style.animationDuration = `${durataAnimazione}ms`;
}


bottoneStart.addEventListener("click", () => {
  /*metto come tempo del pomodoro, quello dato in input in "studyTime" */
  minuti = studyTime.value;
  secondi = 0;
  startAnimation();
  intervallo = setInterval(decrementaTempo, 1000); // Esegui decrementaTempo ogni 1000 ms (1 secondo)
});