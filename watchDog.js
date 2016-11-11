const http = require('http');
const gpio = require('gpio');

http.get('http://10.0.0.70', (res) => {
  console.log(res);
  console.info(gpio);
})
