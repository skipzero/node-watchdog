'use strict';

const http = require('http');
const gpio = require('rpi-gpio');

const pin = 27;

const stationIP = 'http://10.0.0.70';

const sec = 1;
const secTimer = sec * 1000;

console.log('++++++++++++++++++ My GPIO stuff ++++++++++++', gpio)
function cycleOff () {
  setTimeout(() => {
    gpio.write(pin, 0, cycleOn);
  }, secTimer);
};

function cycleOn () {
  setTimeoout(() => {
    gpio.write(pin, 1, done);
  }, secTimer);
};

function done() {
  gpio.destroy;
  console.log(`Pin ${pin} destroyed...`);
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
    console.log(`reset station on ${pin} at ${new Date()}`);
  });
}

console.info(`checked at ${new Date()}`);
// areYouAwake();
