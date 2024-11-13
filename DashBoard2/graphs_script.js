// Example JavaScript for dynamically updating status
function updateStatus(isSitting) {
    const statusElement = document.getElementById("current-status");
    statusElement.textContent = isSitting ? "Sitting" : "Idle";
    statusElement.style.color = isSitting ? "#28a745" : "#dc3545"; // Green for sitting, red for idle
}

// Call this function based on sensor data or other input
updateStatus(false); // or updateStatus(false);