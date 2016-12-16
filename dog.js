#!/home/pi/.nvm/versions/node/v4.5.0/bin/node

'use strict';
const http = require('http');
const gpio = require('pi-gpio');

const pin = 16;
const stationIP = 'http://10.0.0.35';

const cycleOff = () => {
  gpio.open(pin, 'output', err => {
    gpio.write(pin, 0, () => {
      // console.log(`#${pin} set to 'off'...`);
      gpio.close(pin);
    });
  });
  cycleOn();
};

const cycleOn = () => {
  setTimeout(() => {
    gpio.open(pin, 'output', err => {
      gpio.write(pin, 1, () => {
        console.info(`#${pin} set to 'on'...`);
        gpio.close(pin);
      });
    });
  }, 500);
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
    console.log(`Error connecting. \n\n  ${err} \n\nReset station, pin ${pin} @ ${new Date()}`);
  });
};

areYouAwake();
