const http = require('http');
const gpio = require('wpi-gpio');

gpio.BCM_GPIO = true;

http.get('http://10.0.0.70', (res, err) => {
  res.on('err', (err) => {
    console.log(err);
  });

  res.on('data', (data) => {
    console.log(res);
  })
  console.info(gpio);
})
