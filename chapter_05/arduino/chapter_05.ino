const int redLed = 6;
const int greenLed = 5;

char charRead;
String inputString ="";

void setup() {                
  Serial.begin(9600);
  pinMode(redLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
}

void loop() {
  if (Serial.available()) {
    charRead = Serial.read();
    if(charRead != 'T'){
      inputString += charRead;
    } else {

      if(inputString == "true_red"){
        digitalWrite(redLed, 1);
      } else if(inputString == "false_red") {
        digitalWrite(redLed, 0);
      } else if(inputString == "true_green") {
        digitalWrite(greenLed, 1);
      } else if(inputString == "false_green") {
        digitalWrite(greenLed, 0);
      }
      inputString = "";
    }
  }
}