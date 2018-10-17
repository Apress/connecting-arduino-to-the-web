int analogOutPin = 9;

int outputValue = 0;

void setup() {
  pinMode(analogOutPin, OUTPUT);
}

void loop() {

  if (outputValue >= 40){
    outputValue = 0;
    
  } else {
    outputValue = outputValue + 1;
  }
  
  analogWrite(analogOutPin, outputValue);
  delay(200);            
}
