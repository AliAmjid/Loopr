const parseData = require('./parseData');
const { defaultLanguage, languages } = require('../../src/lib/i18n');
const path = require('path');
const fs = require('fs');

const importData = [
  {
    name: 'P_groups_index.listTitle',
    cs: 'Zvolita',
    en: 'Select',
  },
];

const parsedData = parseData().filter(d => d[defaultLanguage] !== undefined);

for (const dataItem of importData) {
  const parsedItemIndex = parsedData.findIndex(d => d.name === dataItem.name);
  if (parsedItemIndex !== -1) {
    for (const language of Object.keys(languages)) {
      parsedData[parsedItemIndex][language] = dataItem[language];
    }
  }
}

/*
{
file:"",
data:{}
 */
const filesData = [];

for (const parsedItem of parsedData) {
  for (const language of Object.keys(languages)) {
    const file = `${language}/${parsedItem.name.split('.')[0]}`;
    const name = parsedItem.name.split('.');

    name.splice(0, 1);
    let filesDataIndex = filesData.findIndex(d => d.file === file);
    if (filesDataIndex === -1) {
      filesData.push({ file, data: {} });
      filesDataIndex = filesData.length - 1;
    }

    const fileData = filesData[filesDataIndex].data;

    const nest = (data, path) => {
      const firsPath = path[0];
      if (path.length === 1) {
        data[path] = parsedItem[language];
      } else {
        if (data[firsPath] === undefined) {
          data[firsPath] = {};
        }
        path.shift();

        nest(data[firsPath], path);
      }
    };

    nest(fileData, name);
  }
}

for (const fileData of filesData) {
  const fileName = path.join(
    __dirname,
    '../../public/static/locales',
    `${fileData.file}.json`,
  );

  fs.writeFileSync(fileName, JSON.stringify(fileData.data, undefined, 2));
}
