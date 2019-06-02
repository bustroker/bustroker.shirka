(function(){
    const exec = require("child_process").exec;
    const mqtt = require("mqtt");

    const config = {
        mqttServer : "mqtt://localhost",
        subscribeTopicTTS: "shirka/voice/tts",
        publishWakeUpTopic: "shirka/voice/wakeup",
        ttsFileName: "tts.wav"
    }
    
    var client  = mqtt.connect(config.mqttServer);

    client.on("connect", () => {
        client.subscribe(config.subscribeTopicTTS);
    });

    client.on("message", (topic, message) => {
        console.log("received message from topic '"+topic+"' => '"+message+"'")
        createOrOverrideTTSWav(message.toString(), config.ttsFileName);
        playFile(config.ttsFileName);
    });

    var playFile = function(localFileName){
        exec("omxplayer -o local " + localFileName);
    }

    var createOrOverrideTTSWav = function(text, fileName){
        exec("pico2wave -w "+config.ttsFileName+ " -l \"en-US\" \""+text+"\"");
    }

    var publishWakeUpMessage = function(){
        client.publish(config.publishWakeUpTopic, "1");
      }
    
    publishWakeUpMessage();
})();