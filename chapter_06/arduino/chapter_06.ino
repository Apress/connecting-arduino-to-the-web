const int analogInA0 = A0;
const int analogInA1 = A1;
const int pushButton = 2;

bool lastButtonState = 0;

int a0Value = 0;
int a0LastValue = 0;

int a1Value = 0;
int a1LastValue = 0;

String a0String = "A0";
String a1String = "A1";
String pushButtonString = "BP";

void setup(){
  Serial.begin(9600);
  pinMode(pushButton, INPUT_PULLUP);
}

void loop(){
  int buttonStateUp = digitalRead(pushButton);
    
    a0Value = analogRead(analogInA0);
    a1Value = analogRead(analogInA1);

    a0Value = map(a0Value, 0, 1023, 0, 10);
    a1Value = map(a1Value, 0, 1023, 0, 10);

    a0LastValue = CheckValue(a0Value, a0LastValue, a0String);
    a1LastValue = CheckValue(a1Value, a1LastValue, a1String);

  if(lastButtonState != buttonStateUp){
   lastButtonState = buttonStateUp;
    
   if(buttonStateUp == false){
       Serial.println(pushButtonString  + a0Value + "," + a1Value);
      }
    
  }
}

int CheckValue(int aValue, int aLastValue, String aString){
  if(aValue != aLastValue){
    Serial.println(aString + aValue);
    aLastValue = aValue;
  }
  return aLastValue;
}
