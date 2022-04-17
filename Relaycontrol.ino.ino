#include<FirebaseESP32.h>
#include <WiFi.h>

#define WIFI_SSID "Infinix HOT 7 PRO"
#define WIFI_PASSWORD "checkyourpass"

#define Relay1 2
#define Relay2 4           
#define FIREBASE_HOST "https://relaycontrol11-default-rtdb.firebaseio.com" 
#define FIREBASE_AUTH "2ib3skzLt5hljaCfK3xfVitct1mfwjOpe8pC31nE"  
FirebaseData firebaseData;

void setup ()
{
  pinMode(Relay1, OUTPUT);
  pinMode(Relay2,OUTPUT);
  Serial.begin(9600);
  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ") ;
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);     
}
void loop ()
{
  if(Firebase.getString(firebaseData, "/Relay1Status"))
  {
    String Relaystatus1 = firebaseData.stringData();
    if(Relaystatus1.toInt() == 1){
      digitalWrite(Relay1, LOW);
      Serial.println("ON");
    }
    else {
      digitalWrite(Relay1, HIGH);
      Serial.println("OFF");
    }
  }else{
    Serial.print("Error in getInt, ");
    Serial.println(firebaseData.errorReason());
  } 
  if(Firebase.getString(firebaseData, "/Relay2Status"))
  {
    String RelayStatus2 = firebaseData.stringData();
    if(RelayStatus2.toInt() == 1){
      digitalWrite(Relay2, LOW);
      Serial.println("ON");
    }
    else {
      digitalWrite(Relay2, HIGH);
      Serial.println("OFF");
    }
  }else{
    Serial.print("Error in getInt, ");
    Serial.println(firebaseData.errorReason());
  } 
}
