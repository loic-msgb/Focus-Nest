const concentrationDuration = 2 * 60; // 20 minutes de concentration (en secondes)
const shortBreakDuration = 1 * 60; // 5 minutes de pause courte (en secondes)
const longBreakDuration = 15 * 60; // 15 minutes de pause longue (en secondes)
const sessionsBeforeLongBreak = 3; // Nombre de sessions de concentration avant la pause longue

// Variables pour le minuteur
let timer;
let isWorking = true; // Pour suivre l'état de travail/pause
let remainingTime = concentrationDuration;
let sessionCount = 0;

// Fonction pour mettre à jour le minuteur
function updateTimer() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('chronometer').textContent = timeString;

    if (remainingTime <= 0) {
        // Le temps est écoulé, déclencher une notification et passer à la prochaine phase
        alert(isWorking ? 'Travail terminé ! Prenez une pause.' : 'La pause est terminée ! On se remet au travail !');
        isWorking = !isWorking;

        if (isWorking) {
            sessionCount++;
            if (sessionCount >= sessionsBeforeLongBreak) {
                // C'est le moment de la pause longue
                remainingTime = longBreakDuration;
                sessionCount = 0; // Réinitialiser le compteur de sessions
            } else {
                remainingTime = concentrationDuration;
            }
        } else {
            remainingTime = shortBreakDuration;
        }
    } else {
        remainingTime--;
    }
}

// Fonction pour démarrer le minuteur
function startTimer() {
    if (!timer) {
        timer = setInterval(updateTimer, 1000);
    }
}

// Fonction pour arrêter le minuteur
function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

// Fonction pour réinitialiser la session
function resetSession() {
    pauseTimer();
    isWorking = true;
    remainingTime = concentrationDuration;
    sessionCount = 0;
    updateTimer();
}

// Attacher des gestionnaires d'événements aux boutons
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
document.getElementById('resetButton').addEventListener('click', resetSession);