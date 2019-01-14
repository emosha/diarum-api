module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  globalSetup: './tests/jest/globalSetup.js',
  globalTeardown: './tests/jest/globalTeardown.js',
  roots: [
    '<rootDir>',
    '<rootDir>/src'
  ],
  modulePaths: [
    '<rootDir>/node_modules',
    '<rootDir>/src',
    '<rootDir>',
  ],
  moduleNameMapper: {
    '^/(.*)': '<rootDir>/src/$1',
    '^resolvers/(.*)': '<rootDir>/src/resolvers/$1',
    '^generated/(.*)': '<rootDir>/src/generated/$1',
    '^utils/(.*)': '<rootDir>/src/utils/$1',
    '^tests/(.*)': '<rootDir>/src/generated/$1',
  },
  coverageDirectory: './coverage/',
  collectCoverage: true
};
