require('@babel/polyfill');
require('@babel/register')({
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: ['@babel/plugin-proposal-class-properties']
});

require('./src/server');
