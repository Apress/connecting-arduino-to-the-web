#include <LiquidCrystal.h>

const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

char charRead;
String inputString = "";
String outputString = "";
String newOutputString = "";

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
}

void loop() {
  if (Serial.available()) {
    charRead = Serial.read();
    if(charRead != 'T'){
      inputString += charRead;
    } else {
      lcd.clear();
      outputString = inputString;
      inputString = "";
    }
  }

  if(newOutputString != outputString){
    lcd.print(outputString);
    newOutputString = outputString;
  }
  
  lcd.scrollDisplayLeft();
  delay(500);
}
