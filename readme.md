## Setup RPi with pocketsphinx from scratch
interesting info:
https://www.npmjs.com/package/pocketsphinx-continuous

### Prerequisits
- install fresh Raspbian
- enable ssh server

### update raspbian
```
sudo apt-get update
sudo apt-get upgrade
```

### sound and micro
- list usb devices
```
lsusb
```
- audio card config. should display alsa card and the micro
```
cat /proc/asound/cards
```
- list recording devices
```
arecord -l
```
_"You will see device card1, device0. Use plughw:1,0 to represent"_

- record 3 seconds
arecord -D plughw:1,0 -d 3 test.wav

### install node npm
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### install pm2 to run and apps in background
```
sudo npm install pm2 -g
```
- pm2 commands ([official doc](https://www.npmjs.com/package/pm2))
```
pm2 start --name [name] main.js
pm2 stop     <app_name|id|'all'|json_conf>
pm2 restart  <app_name|id|'all'|json_conf>
pm2 delete   <app_name|id|'all'|json_conf>
```

### install pocketsphinx (shirka_ears)
- first install  python-dev
```
sudo apt-get install python-dev
```

- install pulseaudio
```
sudo apt-get install pulseaudio
sudo reboot now
```
- install phocketsphinx (from https://www.alatortsev.com/2018/06/28/speech-processing-on-raspberry-pi-3-b/)

#### web para generar el modelo a partir del diccionario (dictionary.txt)
http://www.speech.cs.cmu.edu/tools/lmtool-new.html

de aquí se obtienen los archivos 'lm' y 'dic' a partir de 'dictionary.txt'

#### run pocketsphinx 
- con modelo en inglés, y los archivos lm y dic generados. saca los comandos que recibe por la consola.
```
pocketsphinx_continuous -hmm  /usr/local/share/pocketsphinx/model/en-us/en-us -lm /home/pi/shirka/shirka_ears/0520.lm -dict /home/pi/shirka/shirka_ears/0520.dic -inmic yes
```

- en modo keyword (with "shirka" it complains of not finding it in the dictionary)
```
pocketsphinx_continuous -keyphrase "basket" -kws_threshold 1e-50  -inmic yes
```

### install pico TTS (shirka_voice)
(http://manpages.ubuntu.com/manpages/precise/man1/pico2wave.1.html)
(https://www.openhab.org/addons/voice/picotts/)
```
sudo apt-get install libttspico-utils
```
- commands
```
pico2vave --usage
pico2wave -w hello.wav -l "" "hi shirka"
```
- voices
German (de-DE)
English, US (en-US)
English, GB (en-GB)
Spanish (es-ES)
French (fr-FR)
Italian (it-IT)

### install servidor y clientes de mosquitto 
```
sudo apt update
sudo apt install -y mosquitto mosquitto-clients
sudo systemctl status mosquitto
```

- ejecutar momsquitto
```
sudo systemctl enable mosquitto
```
- suscribir la consola a un topic
```
mosquitto_sub -h localhost -t "micro/commands"
```
- publish desde la consola a un topic
```
mosquitto_pub -h localhost -t "test/message" -m "Hello, world"
```

### install nodered
bash <(curl -sL https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/update-nodejs-and-nodered)

_from https://nodered.org/docs/hardware/raspberrypi_

#### run nodered
_"You can now start Node-RED with the command  node-red-start then point your browser to localhost:1880"_


#### run node-red as a service on startup
```
sudo systemctl enable nodered.service
```
listening in:
http://localhost:1880

## Cheat sheet

### espeak 
```
sudo apt-get install espeak
```

### play wav file
```
omxplayer -o local example.wav
```

### page to generate the voice
notevibes.com
voz English(UK) Gabriela
