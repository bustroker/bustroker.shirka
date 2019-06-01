(function(){
    const exec = require("child_process").exec;
    const mqtt = require("mqtt");

    const config = {
        mqttServer : "mqtt://localhost",
        topicHello: "shirka/voice/hello",
        topicOk: "shirka/voice/ok",
        topicDoorOpen: "shirka/voice/doorOpen",
        topicDoorClosed: "shirka/voice/doorClosed",
        topicHi: "shirka/voice/hi"
    }
    
    var client  = mqtt.connect(config.mqttServer);

    client.on("connect", () => {
        client.subscribe(config.topicHello);
        client.subscribe(config.topicOk);
        client.subscribe(config.topicDoorClosed);
        client.subscribe(config.topicDoorOpen);
        client.subscribe(config.topicHi);
    });

    client.on("message", (topic, message) => {
        console.log("received message from topic '"+topic+"' => '"+message+"'")
        switch(topic) {
            case config.topicOk:
              sayOk();
              break;
            case config.topicHi:
                sayHi();
                break;
            case config.topicHello:
              sayHello();
              break;
            case config.topicDoorOpen:
                sayDoorOpen();
                break;
            case config.topicDoorClosed:
                sayDoorClosed();
                break;
            default:
              console.log("Unrecognized topic => " + topic);
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


    sayImHere();
})();