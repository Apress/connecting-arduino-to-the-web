#include <SimpleDHT.h>

int pinTempHumidity = 2;
SimpleDHT11 dht11;

byte temperature = 0;
byte humidity = 0;
byte data[40] = {0};

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("Current Reading");
  dht11.read(pinTempHumidity, &temperature, &humidity, data);
  Serial.print((int)temperature); Serial.print(" *C, ");
  Serial.print((int)humidity); Serial.println(" %");
  
  delay(10000);
}
