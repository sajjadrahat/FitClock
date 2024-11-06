from machine import Pin, time_pulse_us
import time

# Define the GPIO pin for the ultrasonic sensor
SIG_PIN = 12  # Replace with the GPIO pin

# Initialize the pin for the sensor
sensor = Pin(SIG_PIN, Pin.OUT)

def get_distance():
    # Set pin to output mode to send trigger pulse
    sensor.init(Pin.OUT)
    sensor.value(0)            # Ensure it starts low
    time.sleep_us(2)
    sensor.value(1)            # Send a 10-microsecond pulse
    time.sleep_us(10)
    sensor.value(0)

    # Switch pin to input mode to listen for echo
    sensor.init(Pin.IN)

    # Measure the duration of the echo pulse
    duration = time_pulse_us(sensor, 1)  # Measure the time the pin stays high

    # Calculate distance (duration * speed of sound / 2)
    distance = (duration * 0.0343) / 2  # 0.0343 cm/µs is the speed of sound

    return distance

