const path = require('path');
const fs = require('fs');

const filesForCopy = path.resolve(__dirname, 'files');
const copyFiles = path.resolve(__dirname, 'files-copy');


// fs.mkdir(copyFiles, {recursive: true}, () => {});

// fs.stat(copyFiles, function (err) {
//   if (!err) {
//     fs.readdir(copyFiles, (err, items) => {
//       for (let i = 0; i < items.length; i++) {
//         fs.unlink(path.join(copyFiles, items[i]), (err) => {
//           if (err) console.log(err);
//           else console.log('Файл удалён');
//         });
//       }
//       fs.readdir(filesForCopy, (err, items) => {
//         console.log('Накопировал для вас тут');
//         for (let i = 0; i < items.length; i++) {
//           console.log(items[i]);
//           fs.copyFile(path.join(filesForCopy, items[i]), path.join(copyFiles, items[i]), () => {});
//         }
//       });
//     });
//   }
// });

async function funcOne() {
  fs.stat(copyFiles, function (err) {
    if (!err) {
      fs.readdir(copyFiles, (err, items) => {
        for (let i = 0; i < items.length; i++) {
          fs.unlink(path.join(copyFiles, items[i]), (err) => {
            if (err) console.log(err);
            // else console.log('Файл удалён');
          });
        }
        funcTwo();
      });
    }
  });
  
}

async function funcTwo() {
  fs.mkdir(copyFiles, {recursive: true}, () => {});
  fs.readdir(filesForCopy, (err, items) => {
    console.log('Файлы успешно скопированы');
    for (let i = 0; i < items.length; i++) {
      // console.log(items[i]);
      fs.copyFile(path.join(filesForCopy, items[i]), path.join(copyFiles, items[i]), () => {});
    }
  });
}

funcOne();

// async function makeAll() {
//   await funcOne();


//   await funcTwo();
// }
// makeAll();


// const makeDir = async (pathh) => {
//   return new Promise((resolve, reject) => fs.mkdir(pathh, {recursive: true}, err => {
//     if (err) return reject(err.message);
//     resolve();
//   }));
// };

// const statusAs = async (pathh) => {
//   return new Promise((resolve, reject) => fs.stat(pathh, err => {
//     if (err) return reject(err.message);
//     resolve();
//   }));
// };

// const readDirForDel = async (pathh) => {
//   return new Promise((resolve, reject) => fs.readdir(pathh, (err, items) => {
//     if (err) return reject(err.message);

//     for (let i = 0; i < items.length; i++) {
//       fs.unlink(path.join(copyFiles, items[i]), (err) => {
//         if (err) console.log(err);
//         else console.log('Файл удалён');
//       });
//     }
//   }));
// };

// const readDirForCopy = async (pathh) => {
//   return new Promise((resolve, reject) => fs.readdir(pathh, (err, items) => {
//     if (err) return reject(err.message);
//     console.log('Накопировал для вас тут');
//     for (let i = 0; i < items.length; i++) {
//       console.log(items[i]);
//       fs.copyFile(path.join(filesForCopy, items[i]), path.join(copyFiles, items[i]), () => {});
//     }
//   }));
// };



// makeDir(copyFiles)
//   .then(() => statusAs(copyFiles))
//   .then(() => readDirForDel(copyFiles))
//   .then(() => readDirForCopy(filesForCopy))
//   .catch(err => console.log(err));


// .then(() => copyFile(path.join(filesForCopy, items[i]), path.join(copyFiles, items[i])))
// .then(() => delFile(path.join(copyFiles, items[i]))).
// const delFile = async (path) => {
//   return new Promise((resolve, reject) => fs.unlink(path, err => {
//     if (err) return reject(err.message);
//     resolve();
//   }));
// };

// const copyFile = async (path, newPath) => {
//   return new Promise((resolve, reject) => fs.copyFile(path, newPath, err => {
//     if (err) return reject(err.message);
//     resolve();
//   }));
// };