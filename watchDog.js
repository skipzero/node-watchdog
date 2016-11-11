'use strict';

const http = require('http');
const gpio = require('wpi-gpio');

gpio.BCM_GPIO = true;

http.get('http://10.0.0.70', (res, err) => {
  res.setEncoding('utf8');

  res.on('err', (err) => {
    console.log(err.message);
  });

  res.on('data', (data) => {
    let status = JSON.parse(data);
    status = status.connected;

    if (status !== true) {
      gpio.sequence();
    } else {
      console.log('ok....')
    }

  });
  console.info(gpio);
})
