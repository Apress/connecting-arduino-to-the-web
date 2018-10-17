#include <LiquidCrystal.h>

const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

const int buzzer = 9;
const int led = 13;

int state = LOW;
boolean piezoState = false; 
int newData = 14;

void setup() {
  lcd.begin(16, 1); 
    pinMode(buzzer, OUTPUT);
  pinMode(led, OUTPUT); 
  Serial.begin(9600);
}

void loop() {
  if(Serial.available()){
    newData = 0;
    lcd.home();
    while(Serial.available() > 0){
      
      lcd.write(Serial.read());
    }
  }
  lcd.scrollDisplayLeft();
  if(newData < 12){
    newData = newData + 1;
    blink_led();
    digitalWrite(led, state); 
    buzz();
    if(piezoState){
      tone(buzzer, 500);
    }else{
      noTone(buzzer);
    }
  } 
  delay(500);
}

void blink_led(){
  state = !state;
}

void buzz(){
   piezoState = !piezoState;
}
