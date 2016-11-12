'use strict';

const http = require('http');
const gpio = require('pi-gpio');

//  Our times
const secTimer = sec(1);
const minTimer = min(15);

const pin = 16;

console.log('sec', secTimer, 'mainMin', minTimer);

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
      return;
    }
    console.info(`Station currently up! ${new Date()}`)
  });
}
