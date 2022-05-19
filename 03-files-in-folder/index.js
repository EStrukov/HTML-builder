const path = require('path');
const fs = require('fs');

const secFolder = path.resolve(__dirname, 'secret-folder');


fs.readdir(secFolder, (err, data) => {
  if (err) console.log(err);
  data.forEach(file => {
    fs.stat(path.join(secFolder, file), (err, stats) => {
      if (err) console.log(err);
      if (stats.isFile()) {
        console.log(file.split('.').shift() + ' - ' + file.split('.').pop() + ' - ' + stats.size / 1024 + 'kb');
      }
    });
  });
});