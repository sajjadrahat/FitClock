from machine import Pin

# Define the GPIO pin for the motion sensor
MOTION_PIN = 33

# Initialize the motion sensor pin with a pull-down resistor
motion_sensor = Pin(MOTION_PIN, Pin.IN, Pin.PULL_DOWN)

def is_motion_detected():
    return motion_sensor.value() == 1  
