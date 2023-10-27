const workDuration = 25 * 60; // 25 minutes de travail (en secondes)
const shortBreakDuration = 5 * 60; // 5 minutes de pause courte (en secondes)

// Variables pour le minuteur
let timer;
let isWorking = true;
let remainingTime = workDuration;

// Fonction pour mettre à jour le minuteur
function updateTimer() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('chronometer').textContent = timeString;

    if (remainingTime <= 0) {
        // Le temps est écoulé, déclencher une notification et passer à la prochaine phase
        alert(isWorking ? 'Travail terminé ! Prenez une pause bien méritée.' : 'La pause est terminée ! On se remet au travail !');
        isWorking = !isWorking;
        remainingTime = isWorking ? workDuration : shortBreakDuration;
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
// Fonction pour mettre en pause le minuteur
function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

// Attacher des gestionnaires d'événements aux boutons
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);