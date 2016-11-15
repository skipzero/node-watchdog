'use strict';

const http = require('http');
const gpio = require('rpi-gpio');
const rpio = require('rpio');

const pin = 23;
const stationIP = 'http://10.0.0.70';

const sec = 5;
const secTimer = sec * 1000;

rpio.open(pin, rpio.OUTPUT, rpio.HIGH);

const cycleOff = () => {
  rpio.write(pin, rpio.LOW);
};

const cycleOn = () => {
  rpio.write(pin, rpio.HIGH)
};

const areYouAwake = () => {
  http.get(stationIP, (res) => {
    const code = res.statusCode;
    res.setEncoding('utf8');
    if (code === 200) {
      console.info(`Station up at ${new Date()}`);
      return;
    }
  }).on('error', (err) => {
    cycleOff();
    rpio.sleep(sec);
    cycleOn();
    rpio.destropy();
    
    console.log(`reset station on pin ${pin} at ${new Date()}`);
  });
};

areYouAwake();
