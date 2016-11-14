'use strict';

const http = require('http');
const gpio = require('rpi-gpio');

const pin = 23;

const stationIP = 'http://10.0.0.70';

const sec = 1;
const secTimer = sec * 1000;

gpio.setMode(BCM_MODE);
console.log('++++++++++++++++++ My GPIO stuff ++++++++++++')
function cycleOff () {
  setTimeout(() => {
    gpio.write(pin, 0, cycleOn);
  }, secTimer);
};

function cycleOn () {
  gpio.write(pin, 1, cycleOff);
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
    gpio.setup(pin, gpio.DIR_OUT, cycleOff);
    console.log(`reset station on ${pin} at ${new Date()}`);
  });
}

console.info(`checked at ${new Date()}`);
// areYouAwake();
