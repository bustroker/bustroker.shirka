

## Setup RPi with pocketsphinx
interesting info:
https://www.npmjs.com/package/pocketsphinx-continuous



### install fresh Raspbian

### enable ssh server

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
You will see device card1, device0. Use plughw:1,0 to represent

- record 3 seconds
arecord -D plughw:1,0 -d 3 test.wav

### install node npm
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```


### install nodered
bash <(curl -sL https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/update-nodejs-and-nodered)

_from https://nodered.org/docs/hardware/raspberrypi_

### run nodered
_"You can now start Node-RED with the command  node-red-start then point your browser to localhost:1880"_

### install pocketsphinx
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

### run pocketsphinx con modelo en inglés, y los archivos lm y dic generados.
### saca los comandos que recibe por la consola.
```
pocketsphinx_continuous -hmm  /usr/local/share/pocketsphinx/model/en-us/en-us -lm /home/pi/shirka/shirka_ears/0520.lm -dict /home/pi/shirka/shirka_ears/0520.dic -inmic yes
```
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
### instalar cliente mqtt para node
```
npm install mqtt --save
```
### play wav file
```
omxplayer -o local example.wav
```
### run node-red forever from console
```
nohup node-red &
```
- listening in:
http://192.168.1.106:1880

#### run node-red forever from console, without writing logs
```
nohup node-red >/dev/null 2>&1 &
```
### página para generar las voces
notevibes.com
voz English(UK) Gabriela
