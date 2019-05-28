const exec = require("child_process").exec;
const mqtt = require("mqtt");

const config = {
    mqttServer : "mqtt://localhost",
    topicShirkaAck: "shirkaVoice/ack",
    topicShirkaOk: "shirkaVoice/ok"
  }
  
var client  = mqtt.connect(config.mqttServer);

client.on("connect", () => {
    client.subscribe(config.topicShirkaAck);
    client.subscribe(config.topicShirkaOk);
});

var sayAck = function(){
    exec("omxplayer -o local ShirkaImHere.wav");
}

var sayOk = function(){
    exec("omxplayer -o local ShirkaOK.wav");
};

client.on("message", (topic, message) => {
    if(topic == config.topicShirkaAck){
        sayAck();
    }
    else if(topic == config.topicShirkaOk){
        sayOk();      
    }
    else{
        console.log("Unrecognized voice topic '"+topic+"'");
    }
});

console.log("Executing shirka_voice with config: " + JSON.stringify(config));