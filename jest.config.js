
/** @type {import('jest').Config} */
const config = {
  roots:['<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': "ts-jest"
  },

};

module.exports = config;
