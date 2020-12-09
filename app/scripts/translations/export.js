const i18n = require('../../src/lib/i18n');

const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv');

const { languages } = i18n;
const parseData = require('./parseData');

const csvData = json2csv.parse(parseData(), {
  fields: ['name', ...Object.keys(languages)],
});
fs.writeFileSync(
  path.join(__dirname, '../../translations-export.csv'),
  csvData,
);
