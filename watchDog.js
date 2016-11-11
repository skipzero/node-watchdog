'use strict';

const http = require('http');
const gpio = require('pi-gpio');

const n = 3;
const sec = (num) => {
  return num * 1000;
}
const min = (num) => {
  return sec(num);
};

const timer = sec(3);
const mainMin = (15);

console.log('sec', timeer, 'mainMin', mainMin);

gpio.BCM_GPIO = true;

function cycleOff (pin) {
  setTimout(() => {
    gpio.write(pin, 0, () => {
      cycleOn();
    });
  }, timer);
};

function cycleOn (pin) {
  setTimout(() => {
    gpio.write(pin, 0, () => {
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
