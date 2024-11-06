import wifi
import ultrasonic_sensor
import temperature_sensor
import motion_sensor
from umqtt.simple import MQTTClient
import time
import ujson

# Connect to Wi-Fi
if wifi.connect_wifi(): 
    pass
else:
    print("Could not connect to Wi-Fi.")
    # Exit if no Wi-Fi connection
    raise SystemExit

# MQTT configuration
MQTT_BROKER = "broker.hivemq.com"
MQTT_PORT = 1883
CLIENT_ID = "fitclock_lapinamk"
TOPIC = "lapinamk/fitclock"

# Initialize MQTT client
client = MQTTClient(CLIENT_ID, MQTT_BROKER, port=MQTT_PORT)

# Function to connect to MQTT broker
def connect_mqtt():
    try:
        client.connect()
        print("Connected to MQTT Broker:", MQTT_BROKER)
    except Exception as e:
        print("Failed to connect to MQTT broker:", e)
        raise SystemExit

# Record the machine start time
start_time = time.time()

# Function to gather sensor and time data and publish in JSON format
def publish_data():
    # Calculate elapsed time
    elapsed_seconds = int(time.time() - start_time)  # Elapsed time in seconds

    # Convert elapsed time to formatted string (HH:MM:SS)
    hours = elapsed_seconds // 3600
    minutes = (elapsed_seconds % 3600) // 60
    seconds = elapsed_seconds % 60
    formatted_time = f"{hours:02}:{minutes:02}:{seconds:02}"
    
    # Get sensor data
    temperature, humidity = temperature_sensor.get_temperature_and_humidity()
    distance = ultrasonic_sensor.get_distance()
    motion = motion_sensor.is_motion_detected()
    
    # Format data as JSON
    data = {
        "timestamp": formatted_time,
        "temperature": temperature,
        "humidity": humidity,
        "distance": distance,
        "motion": motion
    }
    
    # Convert data dictionary to JSON string
    json_data = ujson.dumps(data)
    
    # Publish JSON data to MQTT
    client.publish(TOPIC, json_data)
    print("Published:", json_data)

# Connect to MQTT broker
connect_mqtt()

# Main loop: Publish data every second
while True:
    publish_data()
    time.sleep(1)

