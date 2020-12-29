const i18n = require('../../src/lib/i18n');

const fs = require('fs');
const path = require('path');

const { languages, defaultLanguage } = i18n;
const translationsFolder = path.join(__dirname, '../../public/static/locales');

const parseData = () => {
  const parsedData = [];
  const nestIn = (obj, path, language) => {
    for (const key of Object.keys(obj)) {
      const field = obj[key];
      const fieldPath = `${path || ''}${path ? '.' : ''}${key}`;
      if (typeof field === 'string') {
        const currentIndex = parsedData.findIndex(d => d.name === fieldPath);
        if (currentIndex === -1) {
          if (language === defaultLanguage)
            parsedData.push({ name: fieldPath, [language]: field });
        } else {
          parsedData[currentIndex] = {
            ...parsedData[currentIndex],
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
        path.join(translationsFolder, language, file),
      );

      nestIn(JSON.parse(fileData), file.replace('.json', ''), language);
    }
  }

  return parsedData;
};

module.exports = parseData;
