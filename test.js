'use strict';
const http = require('http');
const cmd = require('node-cmd');

const stationIP = 'http://10.0.0.35';

const sec = 1;
const secTimer = sec * 1000;

const cycleOn = () => {
  setTimeout(() => {
    cmd.run('sudo python /home/pi/gpio.py on');
    console.info('set to on...');
  }, secTimer);
};

const cycleOff = () => {
  cmd.run('sudo python /home/pi/gpio.py off');
  cycleOn();
  console.info('set pin to off...')
}

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
    console.info(`reset station on pin at ${new Date()}`);
  }).on('data', (data) => {
    console.info('Data', data);
  });
};
