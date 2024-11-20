document.addEventListener("DOMContentLoaded", () => {
    const meditationIcon = document.getElementById('meditation-icon');
    const WALKING_ICON = '🚶';
    const COMPUTER_ICON = '🧑‍💻';

    // Convert timeLeft (hh:mm:ss) to total seconds
    function getTotalSeconds(timeLeft) {
        const [hours, minutes, seconds] = timeLeft.split(':').map(num => parseInt(num, 10));
        return (hours * 3600) + (minutes * 60) + (seconds || 0);
    }

    // Format total seconds back to hh:mm:ss
    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    // Update the meditation icon based on the remaining time
    function updateMeditationIcon(timeLeft) {
        const totalSeconds = getTotalSeconds(timeLeft);
        const threshold = 30 * 60; // 30 minutes

        meditationIcon.innerHTML = totalSeconds > threshold ? WALKING_ICON : COMPUTER_ICON;
    }

    // Simulated timeLeft from Node-RED
    let timeLeft = "00:25:00";

    setInterval(() => {
        const [hours, minutes, seconds] = timeLeft.split(':').map(num => parseInt(num, 10));
        let totalMinutes = (hours * 60) + minutes - 1;

        if (totalMinutes < 0) totalMinutes = 0;

        timeLeft = `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}:00`;
        updateMeditationIcon(timeLeft);
    }, 60000); // Update every minute

    updateMeditationIcon(timeLeft);

    window.getTimeLeft = () => timeLeft;
    window.updateSittingTime = (newTime) => {
        timeLeft = newTime;
        updateMeditationIcon(timeLeft);
    };
});
