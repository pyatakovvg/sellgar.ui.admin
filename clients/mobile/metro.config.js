const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const workspaceRoot = path.resolve(__dirname, '../..');
const mobileNodeModules = path.resolve(__dirname, 'node_modules');
const reanimatedNodeModules = path.resolve(
  path.dirname(require.resolve('react-native-reanimated/package.json', { paths: [workspaceRoot] })),
  'node_modules',
);

const config = {
  projectRoot: __dirname,
  resolver: {
    disableHierarchicalLookup: true,
    extraNodeModules: {
      semver: path.resolve(reanimatedNodeModules, 'semver'),
    },
    nodeModulesPaths: [mobileNodeModules, path.resolve(workspaceRoot, 'node_modules')],
    unstable_enablePackageExports: true,
  },
  watchFolders: [workspaceRoot],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
