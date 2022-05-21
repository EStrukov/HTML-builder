const {
  stdin,
  stdout
} = process;
const path = require('path');
const fs = require('fs');
const pathText = path.resolve(__dirname, 'text.txt');
let text = '';



stdout.write('Добро пожаловать, введите Ваш текст. \n');

stdin.on('data', data => {
  if (data.toString().toLowerCase().trim() === 'exit') {
    stdout.write('Спасибо, что выбрали нашу записывалку!');
    process.exit();
  } else {
    text = data.toString();
    stdout.write('Желаете дополнить? Для выхода введите "exit" или нажмите ctrl+c \n');
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
  stdout.write('Спасибо, что выбрали нашу записывалку!');
  process.exit();
});
// process.on('exit', () => {
//   stdout.write('Удачи в изучении Node.js!');
//   process.exit('exit');
// });