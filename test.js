#!/usr/bin/env node
'use strict';
const http = require('http');
const cmd = require('node-cmd');
const stationIP = 'http://10.0.0.35';
const gpioer = 'sudo python /home/pi/node-watchdog/gpio.py';
const sec = 1000;

const cycleOn = () => {
  setTimeout(() => {
    cmd.run(`${gpioer} on`);
    console.info('set to on...');
  }, sec);
};

const cycleOff = () => {
  cmd.run(`${gpioer} off`);
  cycleOn();
  console.info('set pin to off...');
};

const areYouAwake = () => {
  http.get(stationIP, (res) => {
    const code = res.statusCode;
    res.setEncoding('utf8');
    if (code === 200) {
      console.info(`Station up at ${new Date()}`);
      return;
    }
    cycleOff();
  })
  .on('error', (err) => {
    cycleOff();
    console.log(`reset station, pin ${pin} @ ${new Date()} \n\n ${err}`);
  });
};

areYouAwake();
