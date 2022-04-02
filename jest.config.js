/*
 * This is a work around so I can customnize Jest's moduleNameMapper
 * but still use the core configuration from react-scripts.
 */
const path = require('path');
const paths = require('react-scripts/config/paths');
const createJestConfig = require('react-scripts/scripts/utils/createJestConfig');

const config = createJestConfig(
  (relativePath) =>
    path.resolve(__dirname, 'node_modules', 'react-scripts', relativePath),
  path.resolve(paths.appSrc, '..'),
  false
);

const finalConfig = {
  ...config,
  moduleNameMapper: {
    ...config.moduleNameMapper,
    // mocks imports when import ends in .worker (e.g. import myWorker from './path/to/myThing.worker')
    '\\.worker$': '<rootDir>/__mocks__/workerMock.js',
  },
};

module.exports = finalConfig;
