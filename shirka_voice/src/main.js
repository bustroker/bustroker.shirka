(function(){
    const exec = require("child_process").exec;
    const mqtt = require("mqtt");

    const config = {
        mqttServer : "mqtt://localhost",
        subscribeTopicTTS: "shirka/voice/tts",
        publishWakeUpTopic: "shirka/voice/wakeup"
    }
    
    var client  = mqtt.connect(config.mqttServer);

    client.on("connect", () => {
        client.subscribe(config.subscribeTopicTTS);
    });

    client.on("message", (topic, message) => {
        console.log("received message from topic '"+topic+"' => '"+message+"'")
        
        switch(message.toString()) {
            case "ok":
              sayOk();
              break;
            case "hi":
                sayHi();
                break;
            case "hello":
              sayHello();
              break;
            case "door open":
                sayDoorOpen();
                break;
            case "door closed":
                sayDoorClosed();
                break;
            case "lights on":
                sayLightsOn();
                break;
            case "lights off":
                sayLightsOff();
                break;
            case "i'm here":
                sayImHere();
                break;
            case "hi i'm shirka voice":
                sayImShirkaVoice();
                break;
            case "hi i'm shirka ears":
                sayImShirkaEars();
                break; 
            default:
              console.log("Unknown message => " + message);
          }
    });


    var playFile = function(localFileName){
        exec("omxplayer -o local " + localFileName);
    }

    var sayImHere = function(){
        playFile("imHere.wav");
    }

    var sayHello = function(){
        playFile("hello.wav");
    }

    var sayOk = function(){
        playFile("ok.wav");
    };

    var sayHi = function(){
        playFile("hi.wav");
    }

    var sayDoorOpen = function(){
        playFile("doorOpen.wav");
    }

    var sayDoorClosed = function(){
        playFile("doorClosed.wav");
    }

    var sayLightsOn = function(){
        playFile("lightsOn.wav");
    }

    var sayLightsOff = function(){
        playFile("lightsOff.wav");
    }

    var sayImShirkaVoice = function(){
        playFile("imShirkaVoice.wav");
    }

    var sayImShirkaEars = function(){
        playFile("imShirkaEars.wav");
    }

    var publishWakeUpMessage = function(){
        client.publish(config.publishWakeUpTopic, "1");
      }
    
    publishWakeUpMessage();
})();