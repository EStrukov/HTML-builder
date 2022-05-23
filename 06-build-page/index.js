const path = require('path');
const {rm, mkdir, readdir, copyFile, appendFile, readFile, writeFile} = require('fs/promises');
const assetsForCopy = path.resolve(__dirname, 'assets');
const projectDist = path.resolve(__dirname, 'project-dist');
const styles = path.resolve(__dirname, 'styles');
const styleDist = path.resolve(__dirname, 'project-dist', 'style.css');
const assetsDist = path.resolve(__dirname, 'project-dist', 'assets');
const htmlDist = path.resolve(__dirname, 'project-dist', 'index.html');
const htmlTemplate = path.resolve(__dirname, 'template.html');
const componentsFolder = path.resolve(__dirname, 'components');


async function clearDist(src) {
  await rm(src, {force: true, recursive: true});
}

async function copyAssets(src, dest) {
  const entities = await readdir(src, {withFileTypes: true});
  for (const entity of entities) {
    if (!entity.isFile()) {
      await mkdir(path.join(dest, entity.name), {recursive: true});
      const files = await readdir(path.join(src, entity.name), {withFileTypes: true});
      for (const file of files) {
        copyFile(path.join(src, entity.name, `${file.name}`), path.join(dest, entity.name, `${file.name}`));
      }
    } else {
      await copyFile(path.join(src, `${entity.name}`), path.join(dest, `${entity.name}`));
    }
  }
}

async function copyStyles(src, dest) {

  const items = await readdir(src, {
    withFileTypes: true
  });
  items.forEach(item => {
    if (path.extname(path.join(src, `${item.name}`)) === '.css') {
      (async () => {
        const data = await readFile(path.join(src, `${item.name}`), 'utf-8');
        appendFile(dest, data, 'utf-8');
      })();
    }
  });
}

async function createNewHTML(src, dest, template) {
  let dataHTML = await readFile(template, 'utf-8');
  const tags = dataHTML.match(/{{\w*}}/g);
  const components = await Promise.all (
    tags.map((tag) => readFile(path.join(src, `${tag.slice(2, -2)}.html`), 'utf-8' ))
  );


  for (let i = 0; i < tags.length; i++) {
    if (path.extname(path.join(src, `${tags[i].slice(2, -2)}.html`)) === '.html') {
      dataHTML = dataHTML.replace(tags[i], components[i]);
    }
  }
  writeFile(dest, dataHTML);
}

async function compl(){
  await clearDist(projectDist);
  await copyAssets(assetsForCopy, assetsDist);
  await copyStyles(styles, styleDist);
  await createNewHTML(componentsFolder, htmlDist, htmlTemplate);
}
compl();