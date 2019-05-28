var Psc = require('pocketsphinx-continuous');
var mqtt = require("mqtt")

const config = {
  mqttServer : "mqtt://localhost",
  publishCommandsTopic: "shirka_ears/commands",
  voiceRecognitionModelId : "0520"
}

var client  = mqtt.connect(config.mqttServer);

var publishCommand = function(command){
  console.log("sending command '"+command+"' to mosquitto..");
  client.publish(config.publishCommandsTopic, command);
}

var ps = new Psc({
  setId: config.voiceRecognitionModelId, 
  verbose: false // Setting this to true will give you a whole lot of debug output in your console.
});

ps.on("shirka", function(data) {
  publishCommand(data);
});

ps.on("shirka status", function(data) {
  publishCommand(data);
});

ps.on("shirka lights on", function(data) {
  publishCommand(data);
});

ps.on("shirka lights off", function(data) {
  publishCommand(data);
});


console.log("running photosphinx_continuous from node..");
console.log("config: " + JSON.stringify(config));
