const path = require('path');

const resolvePackageRoot = (packageName) => {
  return path.dirname(require.resolve(`${packageName}/package.json`, { paths: [__dirname] }));
};

module.exports = {
  dependencies: Object.fromEntries(
    [
      'react-native-gesture-handler',
      'react-native-reanimated',
      'react-native-safe-area-context',
      'react-native-worklets',
    ].map((packageName) => [packageName, { root: resolvePackageRoot(packageName) }]),
  ),
};
