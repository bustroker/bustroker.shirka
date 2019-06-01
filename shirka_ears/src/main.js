(function(){
  var Psc = require('pocketsphinx-continuous');
  var mqtt = require("mqtt")

  const config = {
    mqttServer : "mqtt://localhost",
    earsCommandsTopic: "shirka/ears/commands",
    earsHelloTopic: "shirka/ears/hello",
    voiceRecognitionModelId : "0520"
  }

  var client  = mqtt.connect(config.mqttServer);

  var publishCommand = function(command){
    console.log("sending command '"+command+"' to mosquitto: " + config.earsCommandsTopic);
    client.publish(config.earsCommandsTopic, command);
  }

  var publishHello = function(){
    client.publish(config.earsHelloTopic, "1");
  }

  var ps = new Psc({
    setId: config.voiceRecognitionModelId, 
    verbose: true // Setting this to true will give you a whole lot of debug output in your console.
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


  console.log("running shirka_ears with config:");
  console.log(JSON.stringify(config) + "\n");
  console.log("sending hello to " + config.earsHelloTopic);
  publishHello();

})();
