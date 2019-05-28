

## Setup RPi with pocketsphinx
interesting info:
https://www.npmjs.com/package/pocketsphinx-continuous



### install fresh Raspbian

### enable ssh server

### update raspbian
```
sudo apt-get update
```

### install nodered
bash <(curl -sL https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/update-nodejs-and-nodered)

_from https://nodered.org/docs/hardware/raspberrypi_

### run nodered
_"You can now start Node-RED with the command  node-red-start then point your browser to localhost:1880"_

### install pocketsphinx
https://cmusphinx.github.io/wiki/raspberrypi/

### crear modelo con palabras a reconocer
Ver el paso 8 en:
https://medium.com/@ranjanprj/for-some-time-now-i-have-been-thinking-really-hard-to-build-a-diy-study-aid-for-children-which-uses-17ce90e72f43

de aquí se obtienen los archivos 'lm' y 'dic' a partir de 'dictionary.txt'

#### web para generar el modelo a partir del diccionario
http://www.speech.cs.cmu.edu/tools/lmtool-new.html

### run pocketsphinx con modelo en inglés, y los archivos lm y dic generados.
### saca los comandos que recibe por la consola.
```
pocketsphinx_continuous -hmm  /usr/local/share/pocketsphinx/model/en-us/en-us -lm /home/pi/Apps/pocketsphinx_models/0821/TAR0821/0821.lm -dict /home/pi/Apps/pocketsphinx_models/0821/TAR0821/0821.dic -inmic yes
```
### install servidor y clientes de mosquitto 
```
sudo apt install mosquitto mosquitto-clients
```
- ejecutar momsquitto
```
sudo systemctl enable mosquitto
```
- estado mosquitto
```
sudo systemctl status mosquitto
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
