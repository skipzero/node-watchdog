'use strict';

const http = require('http');
const gpio = require('pi-gpio');

const pin = 16;
const stationIP = 'http://10.0.0.70';

const sec = 5;
const secTimer = sec * 1000;

gpio.close(pin, () => {
  console.log(`#${pin}, opened...`);
});

gpio.open(pin, output, () => {
  console.log(`#${pin}, opened...`);
});

const cycleOff = () => {
  gpio.write(pin, 0, () => {
    console.log(`#${pin} set to 'off'...`)
    cycleOn();
  });
};

const cycleOn = () => {
  setTimeout(() => {
    gpio.write(pin, 1, () => {
      console.info(`#${pin} set to 'on'...`)
    })
  }, secTimer);
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
    console.log(`reset station on pin #${pin} at ${new Date()}`);
  });
};
