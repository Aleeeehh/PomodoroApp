Applicazione per studiare con il metodo del pomodoro


#### 08/04/2024 Ale
     -fixato qualche piccolo bug
     -aggiunto qualche controllo sull'input
     -aggiunta animazione del pomodoro
     -TODO:  provate a romperlo per cercare dei bug, se tutto è apposto
     si può procedere alla consegna
     -NOTA: l'updateTimer è settato a 1000ms come per essere consegnato, l'animazione 
     funziona bene se questo valore rimane tale (perchè in startAnimation 
     converte direttamente l'input in secondi)

#### 06/04/2024 Pinna

-   inserita la logica per gestire le pause e le sessioni multiple
-   inserito un bottone stop che interrompe la sessione
-   inserito un elemento di debug a schermo che mostro lo stato attuale
-   inserita un'immagine di un pomodoro
-   modificato il pulsante start
-   aggiunto link a Bootstrap
-   TODO: da qui si può riprendere tranquillamente la gestione dell'animazione del pomodoro (o di
    una forma diversa)

#### 06/04/24 Ale

    -Ho rifatto da zero l'html ed il css dell'app
    -Ho ripreso l'idea di Andre per l'animazione da rosso a verde
    -Per ora funziona solo l'inserimento di StudyTime
    -COSA MANCA: breakTime e studyCycles non li ho ancora
      implementati per questioni di tempo, ma dovrebbero essere uguali a studyTime
    -COSA MANCA(2): vorrei aggiungere un'animazione in cui il bordo del pomodoro,
    oltre a cambiare colore, si "consuma" (tipo uno snake che si accorcia col passare del tempo)

#### 06/04/24 Andrea

    Per ora siamo al livello 2 di 3 del progettino.
    La mia idea al momento è:
    - usare lo stesso timer sia per il tempo di studio che per quello di pausa
    - l'animazione del tempo di studio è un pomodoro che da acerbo matura (verde, piccolo) --> (rosso, grande)
    - l'animazione del tempo di pausa è lo stesso pomodoro che ritorna acerbo (rosso, grande) --> (verde, piccolo)

    Manca da implementare il meccanismo di alternanza ripetuta delle due sequenze.
