(function(){
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

    var playFile = function(localFileName){
        exec("omxplayer -o local " + localFileName);
    }

    var sayAck = function(){
        playFile("ShirkaImHere.wav");
    }

    var sayOk = function(){
        playFile("ShirkaOK.wav");
    };

    var sayHi = function(){
        playFile("ShirkaOK.wav");
    }

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

    sayHi();
})();