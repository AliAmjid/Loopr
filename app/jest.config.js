module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/lib/jest/enzyme.js'],
  moduleNameMapper: {
    'lib/i18n/namespaces': '<rootDir>/src/lib/i18n/namespaces.ts',
    'lib/i18n': '<rootDir>/src/lib/jest/mocks/i18n.js',
  },
};
