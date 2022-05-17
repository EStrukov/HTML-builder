const {
  stdin,
  stdout
} = process;
const path = require('path');
const fs = require('fs');
const pathText = path.resolve(__dirname, 'text.txt');
let text = '';
// let reading = fs.createReadStream('text.txt', 'utf-8');
// let texting = fs.createWriteStream('text.txt');



stdout.write('Не судите строго, я не понимаю что делаю! Напишите что-нибудь! \n');

stdin.on('data', data => {
  if (data.toString().toLowerCase().trim() === 'exit') {
    stdout.write('Было страшно, но оно работает!');
    process.exit();
  } else {
    text = data.toString();
    stdout.write('Мне кажется, что этой информации недостаточно! \n');
    fs.appendFile(pathText,
      text,
      (err) => {
        if (err) console.log(err);
      }
    );
  }
});

// stdin.on('data', data => {
//   if (data.toString().toLowerCase().trim() === 'exit') {
//     stdout.write('Удачи в изучении Node.js!');
//     process.exit();
//   } else {
//     texting.write(data.toString());
//     stdout.write('Можеть есть что добавить? \n');
//   }
// });

process.on('SIGINT', () => {
  stdout.write('Было страшно, но оно работает!');
  process.exit();
});
// process.on('exit', () => {
//   stdout.write('Удачи в изучении Node.js!');
//   process.exit('exit');
// });