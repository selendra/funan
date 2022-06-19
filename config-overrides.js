const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require('path');

module.exports = function override(config, env) {
  config.resolve = {
    fallback: {
      stream: require.resolve('stream-browserify'),
      // error after install google-spreadsheet(happen on react-script5.0.0)
      // https://stackoverflow.com/questions/70406962/google-spreadsheet-api-throws-crypto-createsign-error-in-react-app-with-webpack
      child_process: false,
      fs: false, 
    },
    alias: {
      'assets': path.resolve(__dirname, './src/assets'),
      'components': path.resolve(__dirname, './src/components'),
      'constants': path.resolve(__dirname, './src/constants'),
      'context': path.resolve(__dirname, './src/context'),
      'globalComponents': path.resolve(__dirname, './src/globalComponents'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'pages': path.resolve(__dirname, './src/pages'),
      'styles': path.resolve(__dirname, './src/styles'),
      'utils': path.resolve(__dirname, './src/utils'),
    }
  };

  config.plugins.push(
    new NodePolyfillPlugin(),
  );

  return config;
}