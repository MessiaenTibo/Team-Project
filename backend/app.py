#region **** IMPORTS ****
import json
from flask_socketio import SocketIO, emit, send
from flask import Flask, jsonify, request
from flask_cors import CORS
#endregion
import time
import paho.mqtt.client as mqtt
import random
import threading
from datetime import datetime
from repositories.DataRepository import DataRepository
from repositories.Database import Database
#region **** variables ****
started = 0
tijd = datetime.now()
tijd_start = datetime.now()
publish = 0
power_off =0
game_progress = 0
btn_choiche1= 0
btn_choiche2=0
name1, name2, color1,color2, degree, buttonGoal,minutes = "","", "", "", "", "",""
score1,score2=0,0
color_choiche = ""
game_bezig = 0
tijd_set=0
aantal_knoppen = 0
selected_gamemode = 0 # 1 = speedrun, 2 = 1v1, 3 = simon says, 4 = shuttle run
#endregion
# Custom endpoint
endpoint = '/api/v1'


def on_publish(client, userdata, mid):
    #voorlopig niks
    pass 
#region **** ESPcallback ****
def callback_esp32_sensor1(client, userdata, msg):
    global btn_choiche1, btn_choiche2, score1, score2,started , selected_gamemode
    if(selected_gamemode == 1):
        if(started==1 or btn_choiche1 == 1):
            speedrun_next(client, userdata, msg)
            started = 0
    elif(selected_gamemode == 2):
        print("voorlpig niks")
    print("knop 1")
def callback_esp32_sensor2(client, userdata, msg):
    global btn_choiche1, btn_choiche2, score1, score2,started , selected_gamemode
    if(started==1 or btn_choiche1 == 2):
        speedrun_next(client, userdata, msg)
        started = 0
    elif(selected_gamemode == 2):
        print("voorlopig niks")
    print("knop 2")
def callback_esp32_sensor3(client, userdata, msg):
    global btn_choiche1, btn_choiche2, score1, score2,started , selected_gamemode
    if(started == 1 or btn_choiche1 == 3):
        speedrun_next(client, userdata, msg)
        started = 0
    elif(selected_gamemode == 2):
        print("voorlopig niks")
    print("knop 3")
def callback_esp32_sensor4(client, userdata, msg):
    global btn_choiche1, btn_choiche2, score1, score2,started , selected_gamemode
    if(started ==1 or btn_choiche1 == 4):
        speedrun_next(client, userdata, msg)
        started = 0
    elif(selected_gamemode == 2):
        print("voorlopig niks")
    print("knop 4")
def callback_esp32_sensor5(client, userdata, msg):
    global btn_choiche1, btn_choiche2, score1, score2,started , selected_gamemode
    if(started == 1 or btn_choiche1 == 5):
        speedrun_next(client, userdata, msg)
        started = 0
    elif(selected_gamemode == 2):
        print("voorlopig niks")
    print("knop 5")
def callback_esp32_sensor6(client, userdata, msg):
    global btn_choiche1, btn_choiche2, score1, score2,started , selected_gamemode
    if(started == 1 or btn_choiche1 == 6):
        speedrun_next(client, userdata, msg)
        started = 0
    elif(selected_gamemode == 2):
        print("voorlopig niks")
    print("knop 6")
#endregion

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
#region **** colorconvert ****
def colorconvert(value):
    temp = value.replace("#", "")
    temp = "0x" + temp
    return temp
#endregion

#region **** game logic steps ****
def speedrun_next(client, userdata, msg):
    global started, publish, power_off, btn_choiche1, game_bezig, aantal_knoppen, game_progress, name1
    print('verwerken:', str(msg.payload.decode('utf-8')))
    if(game_bezig ==1):
        #print('test succes')
        publish = 1
        temp = random.randint(1,6)
        while(temp == btn_choiche1):
            temp = random.randint(1,6)
        btn_choiche1 = temp
        print(btn_choiche1)
        data = {"Username": name1, "GameMode": "Speedrun", "ButtonsRemaining": aantal_knoppen-game_progress}
        y = json.dumps(data)
        socketio.emit('B2F_new_data_speedrun',y)
        #print("verzonden")
        print(data)
        print(y)
    elif(game_bezig == 0):
        power_off = 1
        game_bezig = 1

def multiplayer_next(client, userdata, msg):
    global started, publish, power_off, btn_choiche1, game_bezig, aantal_knoppen, game_progress, name1, btn_choiche2
    print('verwerken:', str(msg.payload.decode('utf-8')))
    if(game_bezig ==1):
        #print('test succes')
        publish = 1
        temp = random.randint(1,6)
        while(temp == btn_choiche1):
            temp = random.randint(1,6)
        btn_choiche1 = temp
        print(btn_choiche1)
        temp = random.randint(1,6)
        while(temp==btn_choiche1 or temp == btn_choiche2):
            temp = random.randint(1,6)
        btn_choiche2=temp
        #data = {"Username": name1, "GameMode": "Speedrun", "ButtonsRemaining": aantal_knoppen-game_progress}
        #y = json.dumps(data)
        #socketio.emit('B2F_new_data_1vs1',y)
        #print("verzonden")
        #print(data)
        #print(y)
    elif(game_bezig == 0):
        power_off = 1
        game_bezig = 1
#endregion
#region **** INIT ****
# Start app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'geheim!'
socketio = SocketIO(app, cors_allowed_origins="*", logger=False, engineio_logger=False, ping_timeout=1)
CORS(app)

#endregion


def add_speedrun(spelNaam, spelers, tijd, naam1, aantalPalen, winnaar, moeilijkheidsgraad):
    sql = "insert into spel (spelNaam, spelers, tijd, naam1, aantalPalen, winnaar, moeilijkheidsgraad) VALUES (%s,%s,%s,%s,%s,%s,%s)"
    params = [spelNaam, spelers, tijd, naam1, aantalPalen, winnaar, moeilijkheidsgraad]
    result = Database.execute_sql(sql, params)
    return result

#region **** ROUTES ****
@app.route('/')
def hallo():
    print('start')
    return "Server is running, er zijn momenteel geen API endpoints beschikbaar."


@app.route(endpoint + '/1vs1/<time>/', methods=['GET'])
def OneVsOne(time):
    if request.method == 'GET':
        print(time)
        data = DataRepository.read_1vs1_data_by_time(time)
        return jsonify(data), 200

@app.route(endpoint + '/speedrun/<difficulty>/<buttons>/', methods=['GET'])
def Speedrun(difficulty, buttons):
    if request.method == 'GET':
        print(difficulty)
        print(buttons)
        data = DataRepository.read_speedrun_data_by_difficulty_and_buttons(difficulty, buttons)
        return jsonify(data), 200

#endregion




# SOCKET.IO EVENTS
@socketio.on('connect')
def initial_connection():
    print('A new client connect')

@socketio.on('1vs1')
def newOneVsOne(testvariabl):
    global name1, name2, color1,color2, degree, buttonGoal,minutes,game_bezig,aantal_knoppen,color_choiche,game_progress,started,tijd_set,selected_gamemode,score1,score2
    print('1vs1', testvariabl)
    color1 = testvariabl["color1"]
    color1 = testvariabl["color2"]
    name1 = testvariabl["name1"]
    name2 = testvariabl["name2"]
    minutes = testvariabl["minutes"]
    tijd_set = minutes*60
    selected_gamemode = 2
    score1=0
    score2=0
    #y = json.dumps(testvariabl)

#difficulty is datie na x sec nie drukt vanzelf naar volgende gaat ma dan zonder punt te geven.
@socketio.on('Speedrun')
def newSpeedrun(testvariabl):
    global game_bezig, aantal_knoppen, color_choiche, game_progress, started, name1, name2, color1, degree, buttonGoal, tijd_start, selected_gamemode
    print('Speedrun', testvariabl)
    #y = json.dumps(testvariabl)
    aantal_knoppen = int(testvariabl["buttonGoal"])
    buttonGoal = int(testvariabl["buttonGoal"])
    name1 = testvariabl["name1"]
    color1 = testvariabl["color1"]
    degree = testvariabl["degree"]
    tijd_start = datetime.now()
    color_choiche=colorconvert(color1)
    game_bezig = 1
    selected_gamemode = 1
    started = 1
    game_progress = 0

@socketio.on('test')
def test():
    print('test')

def mqttrun():
    global started, publish, power_off, btn_choiche1, game_bezig, aantal_knoppen, game_progress, color_choiche, tijd, tijd_start, name1, name2, color1,color2, degree, buttonGoal,selected_gamemode
    client = mqtt.Client("rpi_client2") #this name should be unique
    client.on_publish = on_publish
    flag_connected = 0
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.message_callback_add('esp32/sensor5', callback_esp32_sensor5)
    client.message_callback_add('esp32/sensor4', callback_esp32_sensor4)
    client.message_callback_add('esp32/sensor6', callback_esp32_sensor6)
    client.message_callback_add('esp32/sensor3', callback_esp32_sensor3)
    client.message_callback_add('esp32/sensor2', callback_esp32_sensor2)
    client.message_callback_add('esp32/sensor1', callback_esp32_sensor1)
    client.message_callback_add('rpi/broadcast', callback_rpi_broadcast)
    #client.message_callback_add('esp32/kleur5', callback_rpi_esp5)
    client.connect('127.0.0.1',1883)
    client.loop_start()
    client_subscriptions(client)
    print("......client setup complete............")
    # start a new thread
    client.loop_start()
    while True:
        try:
            if(power_off == 1):
                print("enter")
                msg ='led_uit'
                pubMsg = client.publish(
                    topic='rpi/broadcast',
                    payload=msg.encode('utf-8'),
                    qos=0,
                    )
                pubMsg.wait_for_publish()
                print("game end - alles uit")
                tijd = datetime.now() - tijd_start
                tijd = round(tijd.total_seconds())
                print (tijd)
                add_speedrun("Speedrun",1,tijd,name1,buttonGoal,name1,degree)
                power_off = 0
            if(publish == 1 and selected_gamemode==1):
                print("enter")
                msg ='led_uit'
                pubMsg = client.publish(
                    topic='rpi/broadcast',
                    payload=msg.encode('utf-8'),
                    qos=0,
                    )
                pubMsg.wait_for_publish()
                #print("succes")
                msg =color_choiche
                pubMsg = client.publish(
                    topic=f'esp32/kleur{btn_choiche1}',
                    payload=msg.encode('utf-8'),
                    qos=0,
                    )
                pubMsg.wait_for_publish()
                print("succes2")
                game_progress = game_progress+1
                if(aantal_knoppen==game_progress):
                    game_bezig=0
                    game_progress=0
                    aantal_knoppen = 0
                    color_choiche = ""
                publish = 0
                #btn_choiche = 0
            if(publish==1 and selected_gamemode==2):
                print('1v1 dingen doen')
                pubMsg = client.publish(
                    topic='rpi/broadcast',
                    payload=msg.encode('utf-8'),
                    qos=0,
                    )
                pubMsg.wait_for_publish()
                #kijken of ik color_choiche instel of hier kijk naar welk team :/
                #aan einde gamemode wss niet hier color choiche op "" zetten
                msg =colorconvert(color1)
                pubMsg = client.publish(
                    topic=f'esp32/kleur{btn_choiche1}',
                    payload=msg.encode('utf-8'),
                    qos=0,
                    )
                pubMsg.wait_for_publish()
                msg =colorconvert(color2)
                pubMsg = client.publish(
                    topic=f'esp32/kleur{btn_choiche2}',
                    payload=msg.encode('utf-8'),
                    qos=0,
                    )
                pubMsg.wait_for_publish()
                print("succes3")
                publish=0
        
        except Exception as e:
            print(e)
# START THE APP
if __name__ == '__main__':
    try:
        print("in de try")
        print("\n\n1VS1 data:")
        print(DataRepository.read_1vs1_data_by_time(300))
        print("\n\nspeedrun data:")
        print(DataRepository.read_speedrun_data_by_difficulty_and_buttons(1,5))
        print("\n\nSimon says data:")
        print(DataRepository.read_simonsays_data_by_difficulty_and_start_buttons(1,5))
        print("\n\nShuttle run data:")
        print(DataRepository.read_shuttlerun_data_by_difficulty(2))
        thread = threading.Thread(target=mqttrun, args=(), daemon=True)
        thread.start()
        print("thread gestart")
        print("backend running")
        socketio.run(app, debug=False, host='0.0.0.0')
    except KeyboardInterrupt:
        print('KeyboardInterrupt exception is caught')