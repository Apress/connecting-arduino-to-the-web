#include <SimpleDHT.h>

int pinTempHumidity = 2;
SimpleDHT11 dht11;

byte temperature = 0;
byte humidity = 0;
byte data[40] = {0};
  
int  pinLight  =  A0;     
int  valueLight =  0; 

void setup() {
  Serial.begin(9600);
}

void loop() {
  dht11.read(pinTempHumidity, &temperature, &humidity, data);

  valueLight =  analogRead(pinLight);
  valueLight = map(valueLight, 0, 1023, 10, 0);

  Serial.println((String)temperature + "," + (String)humidity + "," + (String)valueLight);

  delay(500);
}