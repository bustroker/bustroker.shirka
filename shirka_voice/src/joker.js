(function(){

    const mqtt = require("mqtt");

    const config = {
        mqttServer : "mqtt://192.168.1.103",
        subscribeTopicTTS: "shirka/voice/tts"
    }
    
    var client  = mqtt.connect(config.mqttServer);

    client.on("connect", () => {
        client.subscribe(config.subscribeTopicTTS);
    });


    client.on("message", (topic, message) => {
        console.log("received message from topic '"+topic+"' => '"+message.toString()+"'")
        
        switch(message.toString()) {
            case "hi":
              console.log("received 'ok'");
              break;
            default:
              console.log("Unknown message => " + message);
          }
    });
})();