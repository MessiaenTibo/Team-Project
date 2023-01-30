/// @file    Blink.ino
/// @brief   Blink the first LED of an LED strip
/// @example Blink.ino

#include <FastLED.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <stdlib.h>
#include<iostream>
using namespace std;
// How many leds in your strip?
#define NUM_LEDS 9
const char* ssid = "interactieve palen";
const char* password = "internet";
const char* mqtt_server = "10.3.141.1";
WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
#define DATA_PIN 18
#define CLOCK_PIN 13
int number;
int number_old=0;
int aantal=10;
int go=0;
int progress=0;
int starttijd;
#define BUTTON_PIN 2 // GIOP21 pin connected to button
#define BUZZER_PIN 19 // GPIO19 pin connected to buzzer
// Define the array of leds
CRGB leds[NUM_LEDS];
// Variables will change:
int lastState = HIGH; // the previous state from the input pin
int currentState;     // the current reading from the input pin
void setup_wifi() {
  delay(50);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  int c=0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000); //
    Serial.print(".");
    c=c+1;
    if(c>10){
        ESP.restart(); //restart ESP after 10 seconds
    }
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
}
void connect_mqttServer() {
  // Loop until we're reconnected
  while (!client.connected()) {

        //first check if connected to wifi
        if(WiFi.status() != WL_CONNECTED){
          //if not connected, then first connect to wifi
          setup_wifi();
        }

        //now attemt to connect to MQTT server
        Serial.print("Attempting MQTT connection...");
        // Attempt to connect
        if (client.connect("ESP32_client1")) { // Change the name of client here if multiple ESP32 are connected
          //attempt successful
          Serial.println("connected");
          // Subscribe to topics here
          client.subscribe("rpi/broadcast");
          client.subscribe("esp32/kleur1");
          //client.subscribe("rpi/xyz"); //subscribe more topics here
          
        } 
        else {
          //attempt not successful
          Serial.print("failed, rc=");
          Serial.print(client.state());
          Serial.println(" trying again in 2 seconds");
    
          // Wait 2 seconds before retrying
          delay(2000);
        }
  }
  
}
void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp = "";
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  // Check if a message is received on the topic "rpi/broadcast"
  if (String(topic) == "rpi/broadcast") {
      Serial.print("HIER UIT");
      Serial.println(messageTemp);
      for(int i =0;i<9;i++)
        {
          leds[i] = CRGB::Black; 
        }
        FastLED.show(); 
  }
  if (String(topic) == "esp32/kleur1") {
      Serial.print("HIER aan");
      Serial.println(messageTemp);
      const char* ccx = messageTemp.c_str();
      cout << ccx;
      //const char *hexstring = "0xabcdef";
      int number = (int)strtol(ccx, NULL, 0);
      Serial.println(number);
      for(int i =0;i<9;i++)
        {
          leds[i] = number; 
        }
        FastLED.show();
        if (number != 0) {
          digitalWrite(BUZZER_PIN, HIGH);
          delay(200);
          digitalWrite(BUZZER_PIN, LOW);
        }
      
      
  }

  //Similarly add more if statements to check for other subscribed topics 
}
void setup() { 
    FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);  // GRB ordering is assumed
    Serial.begin(115200);
  // initialize the pushbutton pin as an pull-up input
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);
  setup_wifi();
  client.setServer(mqtt_server,1883);//1883 is the default port for MQTT server
  client.setCallback(callback);
}

void loop() { 
    if (!client.connected()) {
    connect_mqttServer();
  }
  client.loop();
  currentState = digitalRead(BUTTON_PIN);
    if(lastState == LOW && currentState == HIGH)
    {
      client.publish("esp32/sensor1", "gedrukt");
    }
  // save the last state
  lastState = currentState;
}
