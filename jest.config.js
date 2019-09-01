const {defaults} = require('jest-config');


module.exports = {
    moduleFileExtensions: [...defaults.moduleFileExtensions],
    setupFiles: ['<rootDir>/setupTests.js'],
    roots: ['<rootDir>/__tests__'],
    moduleNameMapper: {
      '^views(.*)$': '<rootDir>/src/views$1',
      '^components(.*)$': '<rootDir>/src/components$1',
      '^src(.*)$': '<rootDir>/src$1',
      '^tests(.*)$': '<rootDir>/__tests__$1',
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    },
    transformIgnorePatterns: ['/node_modules/'],
    testRegex: '.*test.js$',
    verbose: true,
    testEnvironment: 'node',
    automock: false,
    coverageDirectory: 'coverage'
  };
  