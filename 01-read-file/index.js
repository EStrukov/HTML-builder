// const { stdout,stdin,exit } = process;
const path = require('path');
const fs = require('fs');
const pathText = path.resolve(__dirname, 'text.txt');
// console.log(pathText);

/*-------- рабочий вариант без ReadStream-------*/

// fs.readFile (
//   path.join(__dirname, 'text.txt'),
//   'utf-8',
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

let stream = fs.createReadStream(pathText, 'utf-8');
let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
