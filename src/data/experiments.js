const ultrasonicCode=`const byte trigPin = 9;
const byte echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  unsigned long duration = pulseIn(echoPin, HIGH, 30000);
  if (duration == 0) {
    Serial.println("No echo received");
  } else {
    float distanceCm = duration * 0.0343 / 2.0;
    Serial.print("Distance: ");
    Serial.print(distanceCm, 1);
    Serial.println(" cm");
  }
  delay(500);
}`;
const dhtCode=`#include <DHT.h>
#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
void setup(){ Serial.begin(9600); dht.begin(); }
void loop(){ float h=dht.readHumidity(); float t=dht.readTemperature(); if(isnan(h)||isnan(t)){Serial.println("Failed to read DHT11");return;} Serial.print("Humidity: ");Serial.print(h);Serial.print(" %  Temperature: ");Serial.print(t);Serial.println(" C");delay(2000); }`;
const threeLedCode=`const byte redLed = 12;
const byte yellowLed = 10;
const byte greenLed = 8;

void setup() {
  pinMode(redLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
}

void loop() {
  digitalWrite(redLed, HIGH); delay(500); digitalWrite(redLed, LOW);
  digitalWrite(yellowLed, HIGH); delay(500); digitalWrite(yellowLed, LOW);
  digitalWrite(greenLed, HIGH); delay(500); digitalWrite(greenLed, LOW);
}`;
export const experiments=[
{id:1,slug:'01-ultrasonic-sensor',short:'Ultrasonic Sensor',title:'HC-SR04 Ultrasonic Sensor with Arduino Uno',subtitle:'Distance measurement using ultrasonic echo timing',image:'/diagrams/ultrasonic-upload.png',component:'HC-SR04',pins:'D9 (TRIG), D10 (ECHO)',aim:'Measure an object’s distance with the HC-SR04 ultrasonic sensor.',connections:[['VCC','5V','Power'],['GND','GND','Common ground'],['TRIG','D9','Output pulse'],['ECHO','D10','Input pulse']],procedure:['Connect the sensor to the Uno.','Upload the sketch.','Open Serial Monitor and note distance.'],result:'The Serial Monitor displays measured distance in centimetres.',viva:[['How does HC-SR04 work?','It sends a 40 kHz pulse and measures echo travel time.']],code:ultrasonicCode},
{id:2,slug:'02-dht11-sensor',short:'DHT11 Sensor',title:'DHT11 Interfacing with Arduino Uno',subtitle:'Arduino sketch only',codeOnly:true,code:dhtCode},
{id:3,slug:'03-three-leds',short:'Three LEDs',title:'Three LEDs with Arduino Uno',subtitle:'Breadboard implementation',image:'/diagrams/three-led-breadboard-user.png',component:'3 LEDs + 220 Ω resistors',pins:'D12, D10, D8',aim:'Interface and control three LEDs with Arduino Uno.',connections:[['Red LED anode','D12 through 220 Ω','Cathode to GND'],['Yellow LED anode','D10 through 220 Ω','Cathode to GND'],['Green LED anode','D8 through 220 Ω','Cathode to GND']],procedure:['Build the breadboard layout shown.','Upload the updated sketch.'],result:'The LEDs glow one after another.',viva:[['Why use a resistor?','It limits current and protects the LED.']],code:threeLedCode},
{id:4,slug:'04-hc05-at-commands',short:'HC-05 AT Commands',title:'HC-05 Bluetooth Module AT Commands',subtitle:'Configuration-mode wiring',image:'/diagrams/hc05-configuration-mode.png',imageOnly:true},
{id:5,slug:'05-bluetooth-led',short:'Bluetooth LED ON/OFF',title:'Android / Bluetooth LED ON–OFF',subtitle:'Using the Connectino Android app',procedureOnly:true,procedure:['Wire the HC-05 module and LED circuit, then upload the Bluetooth LED ON/OFF sketch to the Arduino.', 'Install the Connectino app from the Google Play Store and turn on Bluetooth on your phone.', 'Pair the phone with the HC-05 module; use the pairing PIN printed on the module label or supplied by your instructor.', 'Open Connectino, choose the paired HC-05 device, and connect to it.', 'In the app, send 1 to switch the LED ON and send 0 to switch it OFF.', 'Disconnect from the app and switch off the circuit after observing the result.']},
{id:6,slug:'06-led-brightness',short:'LED Brightness',title:'LED Brightness Control',subtitle:'Using the Connectino Android app',procedureOnly:true,procedure:['Wire the HC-05 module and PWM LED brightness circuit, then upload the brightness-control sketch to the Arduino.', 'Install Connectino from the Google Play Store, enable Bluetooth, and pair with the HC-05 module.', 'Open Connectino, select the paired HC-05 device, and connect.', 'Send a brightness value from 0 to 255: 0 is OFF and 255 is maximum brightness.', 'Try values such as 50, 128, and 200, observing the LED brightness after each value.', 'Disconnect the app and turn off the circuit when the experiment is complete.']}
];