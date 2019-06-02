(function(){
  var Psc = require("pocketsphinx-continuous");
  var mqtt = require("mqtt")

  const config = {
    mqttServer : "mqtt://localhost",
    publishCommandsTopic: "shirka/ears/commands",
    publishWakeUpTopic: "shirka/ears/wakeup",
    voiceRecognitionModelId : "0520"
  }

  var client  = mqtt.connect(config.mqttServer);

  var publishCommand = function(command){
    console.log("sending command '"+command+"' to mosquitto: " + config.publishCommandsTopic);
    client.publish(config.publishCommandsTopic, command);
  }

  var publishWakeUpMessage = function(){
    client.publish(config.publishWakeUpTopic, "1");
  }

  var ps = new Psc({
    setId: config.voiceRecognitionModelId, 
    verbose: true // Setting this to true will give you a whole lot of debug output in your console.
  });

  // ps.on("data", function(data){
  //   var command = data.replace("shirka ", "");
  //   publishCommand(command);
  // })

  ps.on("shirka", function(data) {
    data = data.toLowerCase();
    var command = data.replace("shirka ", "");
    publishCommand(command);
  });

  ps.on("shirka status", function(data) {
    data = data.toLowerCase();
    var command = data.replace("shirka ", "");
    publishCommand(command);
  });

  ps.on("shirka lights on", function(data) {
    data = data.toLowerCase();
    var command = data.replace("shirka ", "");
    publishCommand(command);
  });

  ps.on("shirka lights off", function(data) {
    data = data.toLowerCase();
    var command = data.replace("shirka ", "");
    publishCommand(command);
  });

  publishWakeUpMessage();

})();
