# ⏰ FitClock - Smart Health Reminder Clock

FitClock is an IoT-powered desk clock that promotes physical activity and healthy habits through reminders and activity tracking. With a sleek user interface, FitClock provides visual and audio prompts to remind users to stay active, hydrate, and avoid prolonged sitting. It leverages the ESP32 microcontroller with multiple sensors and an optional display for real-time feedback.

## 📋 Project Overview

- **Purpose**: To encourage regular movement, hydration, and posture breaks.
- **Hardware**: ESP32, motion sensor, ultrasonic sensor, temperature sensor, optional OLED display, and a buzzer.
- **Software**: MicroPython with MQTT protocol for connectivity and data sharing.

## 🚀 Features

- **Activity Tracking**: Tracks sitting time and sends reminders to stand, stretch, and walk.
- **Hydration Alerts**: Reminds users to drink water at regular intervals.
- **Environmental Adaptability**: Uses sensors to detect user presence and ambient light for optimal screen brightness.
- **Cloud Integration**: Connects to an MQTT broker for remote data sharing and notifications.

## ⚙️ Hardware Requirements

- **ESP32 Microcontroller**
- **Ultrasonic Sensor** for tracking distance (e.g., to detect user presence)
- **DHT22 Sensor** for temperature and humidity
- **Buzzer** for audible alerts
- **OLED Display** (optional) for showing time and notifications
- **Breadboard, wires, resistors** as needed
