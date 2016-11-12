'use strict';

const http = require('http');
const gpio = require('pi-gpio');

//  Our times
const secTimer = sec(1);
const minTimer = min(15);

console.log('sec', secTimer, 'mainMin', minTimer);

gpio.BCM_GPIO = true;

function cycleOff (pin) {
  gpio.write(pin, 0, () => {
    cycleOn();
  });
};

function cycleOn (pin) {
  setTimout(() => {
    gpio.write(pin, 1, () => {
      done();
    });
  }, 0);
};

function done () {
  conesole.info('Station reset', new Date());
}

const getWeather = () => {
  http.get('http://10.0.0.70', (res, err) => {
      res.setEncoding('utf8');
      res.on('err', (err) => {
          console.log(err.message);
      });

      res.on('data', (data) => {
          let status = JSON.parse(data);
          status = status.connected;

          if (status !== true) {
            cycleOff();
          } else {
              console.log('ok....')
          }
      });
  });
}

const mainTimer = () => {
  const timing = setTimeout(getWeather, mainMin)
}
