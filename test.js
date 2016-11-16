'use strict';

const http = require('http');
const gpio = require('wpi-gpio');

const pin = 23;
const stationIP = 'http://10.0.0.70';

const sec = 5;
const secTimer = sec * 1000;

gpio.BCM_GPIO = true;
gpio.output(pin, 1).then(() => {
  gpio.read(pin).then(val => {
    console.log(`my value after setting to output ${val}`);
  })
}).then(() => {
  // areYouAwake();
  console.info(`initial set pin #${pin} to 'on'...`)
});

gpio.input(pin).then((suc, rej) => {
  gpio.read(pin).then(val => {
    console.log('1 Value...', val)
  })
});

gpio.read(pin).then(val => {
  console.log('2 Value...', val)
})

const cycleOff = () => {
  gpio.write(pin, 0).then(() => {
    console.log(`#${pin} set to 'off'...`)
    cycleOn();
  });
};

const cycleOn = () => {
  setTimeout(() => {
    gpio.write(pin, 1).then(() => {
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
