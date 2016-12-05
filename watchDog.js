'use strict';
const http = require('http');
const gpio = require('pi-gpio');

const pin = 16;
const stationIP = 'http://10.0.0.35';

const sec = 0.5;
const secTimer = sec * 1000;

gpio.close(pin, () => {
  console.log(`#${pin}, closed...`);
});

gpio.open(pin, 'output', () => {
  console.log(`#${pin}, opened...`);
  areYouAwake();
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
    console.log(`Error connecting. reset station, pin ${pin} @ ${new Date()}`);
  });
};
