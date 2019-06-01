(function(){
  var Psc = require('pocketsphinx-continuous');
  var mqtt = require("mqtt")

  const config = {
    mqttServer : "mqtt://localhost",
    publishCommandsTopic: "shirka/ears/commands",
    publishHelloTopic: "shirka/ears/hello",
    publishAckTopic: "shirka/ears/ack",
    voiceRecognitionModelId : "0520"
  }

  var client  = mqtt.connect(config.mqttServer);

  var publishCommand = function(command){
    console.log("sending command '"+command+"' to mosquitto: " + config.publishCommandsTopic);
    client.publish(config.publishCommandsTopic, command);
  }

  var publishAck = function(ackText){
    client.publish(client.publishAckTopic, ackText);
  }

  var publishHello = function(){
    client.publish(config.publishHelloTopic, "1");
  }

  var ps = new Psc({
    setId: config.voiceRecognitionModelId, 
    verbose: true // Setting this to true will give you a whole lot of debug output in your console.
  });

  ps.on("shirka", function(data) {
    publishCommand(data);
    publishAck("shirka");
  });

  ps.on("shirka status", function(data) {
    publishCommand(data);
    publishAck("status");
  });

  ps.on("shirka lights on", function(data) {
    publishCommand(data);
    publishAck("lights on");
  });

  ps.on("shirka lights off", function(data) {
    publishCommand(data);
    publishAck("lights off");
  });


  console.log("running shirka_ears with config:");
  console.log(JSON.stringify(config) + "\n");
  console.log("sending hello to " + config.publishHelloTopic);

  publishHello();

})();
