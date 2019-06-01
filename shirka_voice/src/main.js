(function(){
    const exec = require("child_process").exec;
    const mqtt = require("mqtt");

    const config = {
        mqttServer : "mqtt://localhost",
        subscribeTopicTTS: "shirka/voice/tts"
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

    console.log("running shirka_voice with config:");
    console.log(JSON.stringify(config));

    sayImHere();
})();