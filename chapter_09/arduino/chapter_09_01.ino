const int buzzer = 9;
const int led = 13;
int state = LOW;
boolean piezoState = false; 

void setup(){
  pinMode(buzzer, OUTPUT);
  pinMode(led, OUTPUT);
}

void loop(){
  blink_led();
  digitalWrite(led, state);  
  buzz();
  
  if(piezoState){
    tone(buzzer, 500);
  }else{
    noTone(buzzer);
  }
  delay(500);
}
void blink_led()
{
  state = !state;
}
void buzz(){
   piezoState = !piezoState;

}