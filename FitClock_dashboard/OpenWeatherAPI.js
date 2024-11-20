document.addEventListener("DOMContentLoaded", () => {
    const outsideTempElement = document.getElementById("outside-temperature");

    const fetchOutsideTemperature = async () => {
        const apiKey = "830841021b53c57aa999e1791975d01b"; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Rovaniemi&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            outsideTempElement.textContent = `${data.main.temp}°C`;
        } catch (error) {
            console.error("Error fetching outside temperature:", error);
            outsideTempElement.textContent = "Error";
        }
    };

    fetchOutsideTemperature();
});
