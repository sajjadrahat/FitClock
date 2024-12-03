// Function to update the time in Helsinki
function updateTime() {
    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    const optionsDate = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    // Get Helsinki time and date
    const helsinkiTime = new Date().toLocaleString('en-US', {
        ...optionsTime,
        timeZone: 'Europe/Helsinki'
    });

    const helsinkiDate = new Date().toLocaleString('en-US', {
        ...optionsDate,
        timeZone: 'Europe/Helsinki'
    });

    // Update the clock container
    document.getElementById('time').textContent = helsinkiTime;  // Update time
    document.getElementById('description').textContent = helsinkiDate;  // Update description
}

// Update time every second
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();
