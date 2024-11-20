document.addEventListener("DOMContentLoaded", () => {
    const notificationElement = document.querySelector('.notification');
    const timeElement = document.getElementById('time');

    const gentleBreakMessages = [
        'Rise up and move around! Take a break for %d minutes!',
        'Time for some stretches! Take a break for %d minutes!',
        'Time to move your body! Take a break for %d minutes!'
    ];

    const moderateBreakMessages = [
        'Time for a short walk! Take a break for %d minutes!',
        'Go have a snack! Take a break for %d minutes!',
        'Time for some exercise! Take a break for %d minutes!',
        'Go outside for some fresh air! Take a break for %d minutes!',
        'You have been sitting for too long, time to move! Take a break for %d minutes!'
    ];

    const urgentBreakMessages = [
        'Get up and move NOW! Take a break for %d minutes!',
        'You’ve been sitting for WAY too long! Take a break for %d minutes!',
        'You need to take a break NOW or your health will suffer! %d minutes of movement!',
        'STOP SITTING! Take a break for %d minutes RIGHT NOW!',
        'You’ve been sitting for hours! Get moving and take a %d minute break!'
    ];

    const breakBenefitsMessages = [
        'Taking breaks from sitting can boost performance.',
        'Taking breaks helps to recharge throughout the day.',
        'Not sitting for extended periods prevents future health issues.',
        'Walking around is the most efficient way to pause sitting.'
    ];

    const greetings = {
        morning: 'Good Morning! I’m FitClock, and I’m here to help you stay energized.',
        afternoon: 'Good Afternoon! I’m FitClock, and I’m here to help you stay energized.',
        evening: 'Good Evening! I’m FitClock, and I’m here to help you stay energized.',
    };

    let sittingTime = 0; // Simulated sitting time in minutes
    let breakTime = 2;
    let breakReminderInterval = null;
    let timerColorChanged = false;

    // Calculate greeting based on the time of day
    function getGreeting() {
        const currentHour = new Date().getHours();
        if (currentHour < 12) return greetings.morning;
        if (currentHour < 18) return greetings.afternoon;
        return greetings.evening;
    }

    // Display a notification
    function showNotification(message, breakDuration) {
        const formattedMessage = message.replace('%d', breakDuration);
        notificationElement.textContent = formattedMessage;

        setTimeout(() => {
            notificationElement.textContent = getGreeting();
        }, 3000);
    }

    // Handle sitting time and send appropriate reminders
    function handleSittingTime() {
        if (sittingTime >= 120) {
            showNotification(urgentBreakMessages[0], 5);
            breakTime = 5;
        } else if (sittingTime >= 60) {
            showNotification(moderateBreakMessages[1], 5);
            breakTime = 5;
        } else if (sittingTime >= 30) {
            showNotification(gentleBreakMessages[1], 2);
            breakTime = 2;
        } else if (sittingTime < 30) {
            notificationElement.textContent = getGreeting();
        }
    }

    // Display a random break benefit
    function showBreakBenefit() {
        const randomBenefit = breakBenefitsMessages[Math.floor(Math.random() * breakBenefitsMessages.length)];
        showNotification(randomBenefit, 0);
    }

    // Change timer color for extended sitting time
    function handleSittingOvertime() {
        if (sittingTime > 30 && !timerColorChanged) {
            timeElement.classList.add('sitting-overtime');
            timerColorChanged = true;
        }
    }

    // Start reminders at intervals based on sitting time
    function startBreakReminder() {
        if (breakReminderInterval) clearInterval(breakReminderInterval);

        breakReminderInterval = setInterval(() => {
            if (sittingTime >= 30) {
                if (sittingTime >= 120) {
                    showNotification(urgentBreakMessages[2], breakTime);
                } else if (sittingTime >= 60) {
                    showNotification(urgentBreakMessages[3], breakTime);
                } else if (sittingTime >= 30) {
                    showNotification(gentleBreakMessages[1], breakTime);
                }
            }
        }, 600000);
    }

    // Simulate sitting time increment
    setInterval(() => {
        sittingTime++;
        handleSittingTime();
        handleSittingOvertime();
    }, 60000);

    // Start break reminders after 30 minutes
    setInterval(() => {
        startBreakReminder();
    }, 60000);

    // Example: Show break benefits after 30 minutes
    setTimeout(() => {
        showBreakBenefit();
    }, 1800000);

    // For testing: simulate sitting time of 61 minutes. This data
    // will come from Node-Red:
    sittingTime =40;
    handleSittingTime();
});
