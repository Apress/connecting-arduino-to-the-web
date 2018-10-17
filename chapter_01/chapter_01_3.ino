int pinAnalogInput  =  A0;
int LEDOutput = 13;
int valueLight =  0; 

void setup() {
  pinMode(LEDOutput, OUTPUT);
}

void loop() {
  valueLight =  analogRead(pinAnalogInput);
  if (valueLight < 500) {
    digitalWrite(LEDOutput, LOW);
  } else {
    digitalWrite(LEDOutput, HIGH);
  }

  delay(500);  
}
