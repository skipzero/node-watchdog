'use strict';

const http = require('http');
const gpio = require('wpi-gpio');

gpio.BCM_GPIO = true;

http.get('http://10.0.0.70', (res, err) => {
  res.setEncoding('utf8');

  console.log('......', res.statusCode);

  res.on('err', (err) => {
    console.log(err);
  });

  res.on('data', (data) => {
    let status = JSON.parse(data);
    status = status.connected;

    console.log('Data', status);

    if (status === 200) {

      console.log('Weeeeee.....')
    }
  })
  console.info(gpio);
})
