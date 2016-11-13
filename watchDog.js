'use strict';

const http = require('http');
const gpio = require('pi-gpio');

const sec = 1;
const secTimer = sec * 1000;

function cycleOff () {
  gpio.open(pin, 'output', (err) => {
    gpio.write(pin, 0, () => {
      console.info(`pin ${pin} is off...`);
      gpio.close(pin);
    });
  });
};

function cycleOn () {
  gpio.open(pin, 'output', (err) => {
    gpio.write(pin, 1, () => {
      console.info(`pin ${pin} is on...`);
      gpio.close(pin);
    });
  });
};

const areYouAwake = () => {
  http.get('http://10.0.0.70', (res) => {
    const code = res.statusCode;

    res.setEncoding('utf8');

    if (code !== 200) {
      cycleOff();
      setTimeout(cycleOn, secTimer);
      console.log(`reset station on ${pin} at ${new Date()}`)
      return;
    }
    console.info(`Station up at ${new Data()}`);
  });
}


areYouAwake();
