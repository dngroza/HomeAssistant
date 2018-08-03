import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO
import json
HOST = '192.168.1.110'
# We assume that all GPIOs are LOW
gpio_state = {13: True}

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, rc, *extra_params):
    if rc != 0:
        print("Disconnected!")
        print(get_gpio_status())
    else:
        print('Connected with result code ' + str(rc))
    # Subscribing to receive RPC requests
    client.subscribe('bruh/sensornode12')
    # Sending current GPIO status
    client.publish('bruh/sensornode12/set', get_gpio_status(), 1)


# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print('Topic: ' + msg.topic + '\nMessage: ' + str(msg.payload))
    # Decode JSON request
    data = json.loads(msg.payload)
    print(data)
    # Check request method
    if data['method'] == 'getGpioStatus':
        # Reply with GPIO status
        client.publish(msg.topic.replace('request', 'response'), get_gpio_status(), 1)
    elif data['method'] == 'setGpioStatus':
        # Update GPIO status and reply
        set_gpio_status(data['params']['pin'], data['params']['enabled'])
        client.publish(msg.topic.replace('request', 'response'), get_gpio_status(), 1)
        client.publish('bruh/sensornode12/set', get_gpio_status(), 1)


def get_gpio_status():
    # Encode GPIOs state to json
    return json.dumps(gpio_state)


def set_gpio_status(pin, status):
    # Output GPIOs state
    GPIO.output(pin, GPIO.HIGH if status else GPIO.LOW)
    # Update GPIOs state
    gpio_state[pin] = status


# Using board GPIO layout
GPIO.setmode(GPIO.BOARD)
for pin in gpio_state:
    # Set output mode for all GPIO pins
    GPIO.setup(pin, GPIO.OUT)

client = mqtt.Client()
# Register connect callback
client.on_connect = on_connect
# Registed publish message callback
client.on_message = on_message
# Set access token
#client.username_pw_set(ACCESS_TOKEN)
client.username_pw_set('homeassistant', 'PiHome')
# Connect to ThingsBoard using default MQTT port and 60 seconds keepalive interval
client.connect(HOST, 1883, 60)

try:
    client.loop_forever()
except KeyboardInterrupt:
    GPIO.cleanup()
