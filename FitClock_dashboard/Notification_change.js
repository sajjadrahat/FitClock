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
        'Time for some exercise! Take a break for %d minutes!'
    ];

    const urgentBreakMessages = [
        'Get up and move NOW! Take a break for %d minutes!',
        'You’ve been sitting for WAY too long! Take a break for %d minutes!',
        'STOP SITTING! Take a break for %d minutes RIGHT NOW!'
    ];

    const greetings = {
        morning: 'Good Morning! I’m FitClock, and I’m here to help you stay energized.',
        afternoon: 'Good Afternoon! I’m FitClock, and I’m here to help you stay energized.',
        evening: 'Good Evening! I’m FitClock, and I’m here to help you stay energized.',
    };

    let sittingTime = 0; // Simulated sitting time in minutes
    let currentMessageIndex = { gentle: 0, moderate: 0, urgent: 0 };

    // Function to get the next message in the sequence
    function getNextMessage(messages, type) {
        const index = currentMessageIndex[type];
        const message = messages[index];
        currentMessageIndex[type] = (index + 1) % messages.length;
        return message;
    }

    // Calculate greeting based on the time of day
    function getGreeting() {
        const currentHour = new Date().getHours();
        if (currentHour < 12) return greetings.morning;
        if (currentHour < 18) return greetings.afternoon;
        return greetings.evening;
    }

    // Display a notification with fade animation
    function showNotification(message, breakDuration) {
        const formattedMessage = message.replace('%d', breakDuration);

        // Trigger fade-out
        notificationElement.classList.add('fade-out');
        setTimeout(() => {
            // Change the text after fade-out completes
            notificationElement.textContent = formattedMessage;
            notificationElement.classList.remove('fade-out');

            notificationElement.classList.add('fade-in');
            setTimeout(() => {
                notificationElement.classList.remove('fade-in');

                // After 3 seconds, fade back to the greeting
                setTimeout(() => {
                    resetToGreeting();
                }, 3000);
            }, 1000); // Match fade-in duration
        }, 1000); // Match fade-out duration
    }

    // Reset notification to the greeting
    function resetToGreeting() {
        const greeting = getGreeting();

        // Trigger fade-out
        notificationElement.classList.add('fade-out');
        setTimeout(() => {
            notificationElement.textContent = greeting;
            notificationElement.classList.remove('fade-out');

            // Trigger fade-in for greeting
            notificationElement.classList.add('fade-in');
            setTimeout(() => {
                notificationElement.classList.remove('fade-in');
            }, 1000); // Match fade-in duration
        }, 1000); // Match fade-out duration
    }

    // Handle sitting time and send appropriate reminders
    function handleSittingTime() {
        if (sittingTime >= 120) {
            const message = getNextMessage(urgentBreakMessages, 'urgent');
            showNotification(message, 5);
        } else if (sittingTime >= 60) {
            const message = getNextMessage(moderateBreakMessages, 'moderate');
            showNotification(message, 5);
        } else if (sittingTime >= 30) {
            const message = getNextMessage(gentleBreakMessages, 'gentle');
            showNotification(message, 2);
        } else {
            resetToGreeting();
        }
    }

    // Simulate sitting time increment
    setInterval(() => {
        sittingTime++;
        handleSittingTime();
    }, 60000);

    // For testing: simulate sitting time of 45 minutes
    sittingTime = 65;
    handleSittingTime();
});
