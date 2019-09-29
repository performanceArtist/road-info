const merge = require('webpack-merge');
import baseConfig from './webpack.config.base';

module.exports = merge(baseConfig, { module: {} });
