
const path = require('path');
const fs = require('fs');
const styleFolder = path.resolve(__dirname, 'styles');
const distFolder = path.resolve(__dirname, 'project-dist');


function fileAddinfo(path, data) {
  fs.appendFile(path, data, (err) => {
    if (err) throw err;
    // console.log('Data has been added!');
  });
}

function createBundle() {
  console.log('Запустите project-dist/index.html на лайв-сервере! Красота?)');
  fs.readdir(styleFolder, (err, items) => {
    for (let i = 0; i < items.length; i++) {
      //console.log(items[i]);
      if (path.extname(path.join(styleFolder, items[i])) === '.css') {
        fs.readFile(path.join(styleFolder, items[i]), 'utf8', (err, data) => {
          if (err) throw err;
          //console.log(data);
          fileAddinfo(path.join(distFolder, 'bundle.css'), data);
        });
      }
    }
  });
}

fs.unlink(path.join(distFolder, 'bundle.css'), (err) => {
  if (!err) {
    // else console.log('Файл удалён');
    createBundle();
  } else {
    createBundle();
  }

});
