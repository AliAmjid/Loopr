module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/lib/jest/enzyme.js'],
  moduleNameMapper: {
    'lib/i18n': '<rootDir>/src/lib/jest/mocks/i18n.js',
  },
};
