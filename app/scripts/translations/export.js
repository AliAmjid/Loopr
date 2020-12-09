const i18n = require('../../src/lib/i18n');

const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv');

const { languages, defaultLanguage } = i18n;
const translationsFolder = path.join(__dirname, '../../public/static/locales');

const parserData = [];
const nestIn = (obj, path, language) => {
  for (const key of Object.keys(obj)) {
    const field = obj[key];
    const fieldPath = `${path || ''}${path ? '.' : ''}${key}`;
    if (typeof field === 'string') {
      const currentIndex = parserData.findIndex(d => d.name === fieldPath);
      if (currentIndex === -1) {
        parserData.push({ name: fieldPath, [language]: field });
      } else {
        parserData[currentIndex] = {
          ...parserData[currentIndex],
          [language]: field,
        };
      }
    } else {
      nestIn(field, fieldPath, language);
    }
  }
};

for (const language of Object.keys(languages)) {
  const files = fs.readdirSync(path.join(translationsFolder, language));

  for (const file of files) {
    const fileData = fs.readFileSync(
      path.join(translationsFolder, defaultLanguage, file),
    );

    nestIn(JSON.parse(fileData), file.replace('.json', ''), language);
  }
}

const csvData = json2csv.parse(parserData, {
  fields: ['name', ...Object.keys(languages)],
});
fs.writeFileSync(
  path.join(__dirname, '../../translations-export.csv'),
  csvData,
);
