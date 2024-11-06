from machine import Pin
import dht

# Initialize the DHT22 sensor on a specified GPIO pin
sensor = dht.DHT22(Pin(14))  # Replace with the actual GPIO pin

def get_temperature_and_humidity():
    try:
        sensor.measure()
        temperature = sensor.temperature()
        humidity = sensor.humidity()
        return temperature, humidity
    except OSError as e:
        print("Failed to read from DHT22 sensor:", e)
        return None, None
