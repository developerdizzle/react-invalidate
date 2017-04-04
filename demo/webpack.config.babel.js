import webpack from 'webpack';
import path from 'path';
import packageJson from '../package.json';

const config = [{
  context: __dirname,

  entry: {
    app: './src/app.js',
    react: ['react', 'react-dom'],
    invalidate: ['../src/index.js'],
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['invalidate', 'react'],
      minChunks: 2,
    }),
        new webpack.DefinePlugin({
      PACKAGE_NAME: JSON.stringify(packageJson.name),
      PACKAGE_VERSION: JSON.stringify(packageJson.version),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]
}];

export default config;