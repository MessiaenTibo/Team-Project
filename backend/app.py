import time
import paho.mqtt.client as mqtt
started = 0
publish = 0
def on_publish(client, userdata, mid):
    #voorlopig niks
    pass 
def callback_esp32_sensor1(client, userdata, msg):
    print('ESP sensor1 data: ', msg.payload.decode('utf-8'))
def callback_esp32_sensor2(client, userdata, msg):
    print('ESP sensor2 data: ', str(msg.payload.decode('utf-8')))
def callback_esp32_sensor5(client, userdata, msg):
    global started
    global publish
    print('ESP sensor5 data: ', str(msg.payload.decode('utf-8')))
    if(started ==1):
        print('test succes')
        publish = 1
    elif(started == 0):
        started = 1
def callback_rpi_broadcast(client, userdata, msg):
    print('RPi Broadcast message:  ', str(msg.payload.decode('utf-8')))
def client_subscriptions(client):
    client.subscribe("esp32/#")
    client.subscribe("rpi/broadcast")
def on_connect(client, userdata, flags, rc):
   global flag_connected
   flag_connected = 1
   client_subscriptions(client)
   print("Connected to MQTT server")
def on_disconnect(client, userdata, rc):
   global flag_connected
   flag_connected = 0
   print("Disconnected from MQTT server")

client = mqtt.Client("rpi_client2") #this name should be unique
client.on_publish = on_publish
flag_connected = 0
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.message_callback_add('esp32/sensor1', callback_esp32_sensor1)
client.message_callback_add('esp32/sensor2', callback_esp32_sensor2)
client.message_callback_add('esp32/sensor5', callback_esp32_sensor5)
client.message_callback_add('rpi/broadcast', callback_rpi_broadcast)
client.connect('127.0.0.1',1883)
client.loop_start()
client_subscriptions(client)
print("......client setup complete............")
# start a new thread
client.loop_start()
while True:
    try:
        if(publish == 1):
            print("enter")
            msg ='led_uit'
            pubMsg = client.publish(
                topic='rpi/broadcast',
                payload=msg.encode('utf-8'),
                qos=0,
                )
            pubMsg.wait_for_publish()
            print("succes")
            #hier komt normaal dan random esp kiezen en die aanzetten
            #voorlopig gewoon delay en zelfde terug aan
            time.sleep(0.5)
            msg ='led_aan'
            pubMsg = client.publish(
                topic='rpi/esp5',
                payload=msg.encode('utf-8'),
                qos=0,
                )
            pubMsg.wait_for_publish()
            print("succes2")
            started = 0
            publish = 0
    
    except Exception as e:
        print(e)
        