int buttonInput = 2;
int LEDOutput = 13;

void setup() {
  pinMode(buttonInput, INPUT_PULLUP);
  pinMode(LEDOutput, OUTPUT);
}

void loop() {

  int sensorVal = digitalRead(buttonInput);
  
  if (sensorVal == HIGH) {
    digitalWrite(LEDOutput, LOW);
  } else {
    digitalWrite(LEDOutput, HIGH);
  }
}
