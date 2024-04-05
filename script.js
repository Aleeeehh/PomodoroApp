// Aggiunge un listener per l'evento di submit al form con id 'studyForm'
document.getElementById('studyForm').addEventListener('submit', function(event1) {
  // Previene il comportamento di default dell'evento, che sarebbe il submit del form
  event1.preventDefault();

  // Ottiene il tempo di studio inserito dall'utente e lo converte in un numero intero
  const studyTime = parseInt(document.getElementById('studyTime').value, 10);
  // Converte i minuti in secondi per l'animazione
  const animationDuration1 = studyTime * 60; 

  // Imposta l'animazione con durata dinamica per gli pseudo-elementi ::before e ::after
  const styleSheet1 = document.createElement("style");
  styleSheet1.innerText = `
    .blob {
      animation: example1 ${animationDuration1}s linear forwards;
    }
  `;
  // Aggiunge il foglio di stile creato all'elemento head del documento
  document.head.appendChild(styleSheet1);

  // Calcola il tempo di fine aggiungendo la durata del timer al tempo corrente
  const endTime1 = Date.now() + studyTime * 60000; 

  // Imposta un intervallo che si ripete ogni secondo
  const interval1 = setInterval(function() {
    const now = Date.now();
    // Calcola la differenza tra il tempo di fine e il tempo corrente
    const difference = endTime1 - now;
    
    // Se la differenza è minore o uguale a 0, ferma l'intervallo
    if (difference <= 0) {
      clearInterval(interval1);
      // Pulisce il testo dell'elemento con id 'timerDisplay'
      document.getElementById('timerDisplay').textContent = ""; 
      return;
    }

    // Calcola i minuti e i secondi rimanenti
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Visualizza il tempo rimanente nell'elemento con id 'timerDisplay'
   //padstart aggiunge uno zero prima della stringa se non raggiunge almeno una lunghezza di 2
    document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
});









// Aggiunge un listener per l'evento di submit al form con id 'studyForm'
document.getElementById('chillForm').addEventListener('submit', function(event2) {
  // Previene il comportamento di default dell'evento, che sarebbe il submit del form
  event2.preventDefault();

  // Ottiene il tempo di studio inserito dall'utente e lo converte in un numero intero
  const chillTime = parseInt(document.getElementById('chillTime').value, 10);
  // Converte i minuti in secondi per l'animazione
  const animationDuration2 = chillTime * 60; 

  // Imposta l'animazione con durata dinamica per gli pseudo-elementi ::before e ::after
  const styleSheet2 = document.createElement("style");
  styleSheet2.innerText = `
    .blob {
      animation: example2 ${animationDuration2}s linear forwards;
    }
  `;
  // Aggiunge il foglio di stile creato all'elemento head del documento
  document.head.appendChild(styleSheet2);

  // Calcola il tempo di fine aggiungendo la durata del timer al tempo corrente
  const endTime2 = Date.now() + chillTime * 60000; 

  // Imposta un intervallo che si ripete ogni secondo
  const interval2 = setInterval(function() {
    const now = Date.now();
    // Calcola la differenza tra il tempo di fine e il tempo corrente
    const difference = endTime2 - now;
    
    // Se la differenza è minore o uguale a 0, ferma l'intervallo
    if (difference <= 0) {
      clearInterval(interval2);
      // Pulisce il testo dell'elemento con id 'timerDisplay'
      document.getElementById('timerDisplay').textContent = ""; 
      return;
    }

    // Calcola i minuti e i secondi rimanenti
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Visualizza il tempo rimanente nell'elemento con id 'timerDisplay'
   //padstart aggiunge uno zero prima della stringa se non raggiunge almeno una lunghezza di 2
    document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
});