import network
import time

# List of known Wi-Fi networks with SSID in bytes and corresponding passwords
WIFI_NETWORKS = {
    b'Rahat\xe2\x80\x99s Network': "82060275",
    b'IOTLABRA': "iotlabra2020",
}

def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    
    # Check if already connected
    if wlan.isconnected():
        print("Already connected to Wi-Fi:", wlan.ifconfig())
        return True

    # Scan for available networks if not connected
    print("Scanning for available networks...")
    available_networks = wlan.scan()

    # Attempt to connect to a known network
    for net in available_networks:
        ssid = net[0]  # Keep SSID in raw bytes
        if ssid in WIFI_NETWORKS:
            password = WIFI_NETWORKS[ssid]
            print(f"Connecting to {ssid.decode('utf-8', 'ignore')}...")
            wlan.connect(ssid.decode('utf-8', 'ignore'), password)

            # Wait for connection
            max_attempts = 10
            attempt = 0
            while not wlan.isconnected() and attempt < max_attempts:
                print("Attempting to connect...")
                time.sleep(1)
                attempt += 1

            if wlan.isconnected():
                print(f"Connected to {ssid.decode('utf-8', 'ignore')} with IP: {wlan.ifconfig()[0]}")
                return True
            else:
                print(f"Failed to connect to {ssid.decode('utf-8', 'ignore')}")

    print("No known networks found.")
    return False
