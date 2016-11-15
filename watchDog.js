'use strict';

const http = require('http');
const gpio = require('rpi-gpio');

const pin = 23;
const stationIP = 'http://10.0.0.701';

const sec = 5;
const secTimer = sec * 1000;

gpio.setMode(gpio.MODE_BCM);

const cycleOff = () => {
  setTimeout(() => {
    gpio.write(pin, 0, cycleOn);
  }, secTimer);
};

const cycleOn = () => {
  setTimeout(() => {
    gpio.write(pin, 1, done);
  }, secTimer);
};

const done = () {
  setTimeout(() => {
    gpio.setup(pin, gpio.DIR_OUT, () => {
      gpio.write(pin, 1, () => {
        console.info(`station reset, pin #${pin} has been turned on...`)
      })
    })
  }, secTimer);
}

const areYouAwake = () => {
  http.get(stationIP, (res) => {
    const code = res.statusCode;
    res.setEncoding('utf8');
    if (code === 200) {
      console.info(`Station up at ${new Date()}`);
      return;
    }
  }).on('error', (err) => {
    gpio.setup(pin, gpio.DIR_OUT, cycleOff);
    console.log(`reset station on pin ${pin} at ${new Date()}`);
  });
};

areYouAwake();
