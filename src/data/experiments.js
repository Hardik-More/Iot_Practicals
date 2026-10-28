const dhtCode=`#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT11 sensor!");
    return;
  }

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print(" %  Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");
  delay(2000);
}`;
const ledCode=`const int leds[] = {8, 9, 10};
void setup(){ for(int i=0;i<3;i++) pinMode(leds[i], OUTPUT); }
void loop(){ for(int i=0;i<3;i++){ digitalWrite(leds[i], HIGH); delay(500); digitalWrite(leds[i], LOW); } }`;
export const experiments=[
{id:1,slug:'01-ultrasonic-sensor',short:'Ultrasonic Sensor',title:'HC-SR04 Ultrasonic Sensor with Arduino Uno',subtitle:'Distance measurement using ultrasonic echo timing',image:'/diagrams/ultrasonic-upload.png',component:'HC-SR04',pins:'D9 (TRIG), D10 (ECHO)',aim:'Measure an object’s distance with the HC-SR04 ultrasonic sensor.',connections:[['VCC','5V','Power'],['GND','GND','Common ground'],['TRIG','D9','Output pulse'],['ECHO','D10','Input pulse']],procedure:['Connect the sensor to the Uno.','Upload the sketch.','Open Serial Monitor and note distance.'],result:'The Serial Monitor displays measured distance in centimetres.',viva:[['How does HC-SR04 work?','It sends a 40 kHz pulse and measures echo travel time.']],code:`const int trigPin=9, echoPin=10;
void setup(){Serial.begin(9600);pinMode(trigPin,OUTPUT);pinMode(echoPin,INPUT);}
void loop(){digitalWrite(trigPin,LOW);delayMicroseconds(2);digitalWrite(trigPin,HIGH);delayMicroseconds(10);digitalWrite(trigPin,LOW);long t=pulseIn(echoPin,HIGH);float d=t*0.0343/2;Serial.print("Distance: ");Serial.print(d);Serial.println(" cm");delay(500);}`},
{id:2,slug:'02-dht11-sensor',short:'DHT11 Sensor',title:'DHT11 Interfacing with Arduino Uno',subtitle:'Arduino sketch only',codeOnly:true,code:dhtCode},
{id:3,slug:'03-three-leds',short:'Three LEDs',title:'Three LEDs with Arduino Uno',subtitle:'Breadboard implementation',image:'/diagrams/three-led-breadboard.svg',component:'3 LEDs + 220 Ω resistors',pins:'D8, D9, D10',aim:'Interface and control three LEDs with Arduino Uno.',connections:[['Red LED anode','D8 through 220 Ω','Cathode to GND'],['Yellow LED anode','D9 through 220 Ω','Cathode to GND'],['Green LED anode','D10 through 220 Ω','Cathode to GND']],procedure:['Build the breadboard layout shown.','Upload the sketch.'],result:'The LEDs glow one after another.',viva:[['Why use a resistor?','It limits current and protects the LED.']],code:ledCode},
{id:4,slug:'04-hc05-at-commands',short:'HC-05 AT Commands',title:'HC-05 Bluetooth Module AT Commands',subtitle:'Configuration-mode wiring',image:'/diagrams/hc05-configuration-mode.png',imageOnly:true},
{id:5,slug:'05-bluetooth-led',short:'Bluetooth LED ON/OFF',title:'Android / Bluetooth LED ON–OFF',subtitle:'',empty:true},
{id:6,slug:'06-led-brightness',short:'LED Brightness',title:'LED Brightness Control',subtitle:'',empty:true}
];