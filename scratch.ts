let date = new Date();
const dateString = date.toISOString();
const split = dateString.split('T');
// "21:30:05.974Z"
// "213005.974Z"
let time = split[1].replace(/:/g, '');

time = time.substr(0, time.indexOf('.'));
time = time.substr(0, time.length - 2) + '.' + time.substr(time.length - 2);

console.log(`${split[0]}_${time}`);

