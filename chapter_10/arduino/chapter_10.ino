int xAxisPin = A1;
int yAxisPin = A0;
int buttonPin = 2;

int xPosition = 0;
int yPosition = 0;
int buttonState = 0;

void setup() {
  Serial.begin(9600); 
  
  pinMode(xAxisPin, INPUT);
  pinMode(yAxisPin, INPUT);

  pinMode(buttonPin, INPUT_PULLUP); 
}

void loop() {
  xPosition = analogRead(xAxisPin);
  yPosition = analogRead(yAxisPin);
  buttonState = digitalRead(buttonPin);

  xPosition=map(xPosition,0,1023,0,255); 
  yPosition=map(yPosition,0,1023,0,255); 
  
  Serial.println("x" + (String)xPosition + ",y" + (String)yPosition + ",b" + (String)buttonState);
delay(100);

}
