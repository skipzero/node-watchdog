'use strict';
const http = require('http');
const cmd = require('node-cmd');
const time = 5000;

const restart = () => {
  cmd.run('python ../gpio.py on');
  console.log('fired on!')
}
cmd.run('python ../gpio.py off');
setTimeout(restart(), time);






//
// const stationIP = 'http://10.0.0.35';
// const gpioer = 'sudo python /home/pi/gpio.py';
//
// const sec = 0.5;
// const secTimer = sec * 1000;
//
// const cycleOn = () => {
//   setTimeout(() => {
//     cmd.run(`${gpioer} on`);
//     console.info('set to on...');
//   }, secTimer);
// };
//
// const cycleOff = () => {
//   cmd.run(`${gpioer} off`);
//   cycleOn();
//   console.info('set pin to off...');
// };
//
// const areYouAwake = () => {
//   http.get(stationIP, (res) => {
//     const code = res.statusCode;
//     res.setEncoding('utf8');
//     if (code === 200) {
//       console.info(`Station up at ${new Date()}`);
//       return;
//     }
//   }).on('error', (err) => {
//     cycleOff();
//     console.log(`reset station, pin ${pin} @ ${new Date()}`);
//   });
// };
