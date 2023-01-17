/// @file    Blink.ino
/// @brief   Blink the first LED of an LED strip
/// @example Blink.ino

#include <FastLED.h>

// How many leds in your strip?
#define NUM_LEDS 9

// For led chips like WS2812, which have a data line, ground, and power, you just
// need to define DATA_PIN.  For led chipsets that are SPI based (four wires - data, clock,
// ground, and power), like the LPD8806 define both DATA_PIN and CLOCK_PIN
// Clock pin only needed for SPI based chipsets when not using hardware SPI
#define DATA_PIN 18
#define CLOCK_PIN 13
int number;
int number_old=0;
int aantal=10;
int go=0;
int progress=0;
int starttijd;
#define BUTTON_PIN 2 // GIOP21 pin connected to button
// Define the array of leds
CRGB leds[NUM_LEDS];
// Variables will change:
int lastState = HIGH; // the previous state from the input pin
int currentState;     // the current reading from the input pin

void setup() { 
    FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);  // GRB ordering is assumed
    Serial.begin(9600);
  // initialize the pushbutton pin as an pull-up input
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void loop() { 
    currentState = digitalRead(BUTTON_PIN);
  if(lastState == LOW && currentState == HIGH&&go==1)
  { 
    if(progress<7)
    {
      Serial.print("knop:");
      Serial.println(progress);
      Serial.println("tijd");
      Serial.print((millis()-starttijd)/1000);
      Serial.println(" s");
      // Turn the LED on, then pause
      // Now turn the LED off, then pause
      leds[number] = CRGB::Black;
      FastLED.show();
      // read the state of the switch/button:
      while(number==number_old)
      {number = random(9);}
      number_old=number;
      leds[number] = CRGB::Red;
      FastLED.show();
      progress=progress+1;
      delay(50);
    }
    else
    {
      Serial.println("game end");
      go=0;
      //Serial.println(go);
      for(int y=0;y<5;y++)
      {
        for(int i =0;i<10;i++)
        {
          leds[i] = CRGB::Red; 
        }
        FastLED.show();
        delay(100);
        for(int i =0;i<10;i++)
        {
          leds[i] = CRGB::Black; 
        }
        FastLED.show(); 
        delay(100);
      }
      }
    }
  if(lastState == LOW && currentState == HIGH&&go==0)
  {
    Serial.println("game reset");
    go=1;
    progress=0;
    delay(250);
    starttijd = millis();
    while(number==number_old)
      {number = random(9);}
      number_old=number;
      leds[number] = CRGB::Red;
      FastLED.show();
  }
  // save the last state
  lastState = currentState;
}
