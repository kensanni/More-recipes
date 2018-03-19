import webpack from 'webpack';
import path from 'path';
import dotenv from 'dotenv';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

dotenv.config();

export default {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'client/index'),
  output: {
    path: path.join(__dirname, '../client/dist/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/dist'
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.EnvironmentPlugin([
      'REQUEST', 'CLOUD_PRESET', 'JWT_SECRET'
    ])
  ],
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: path.join(__dirname, 'client')
      },
      {
        test: /\.(jpg|png|svg|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './images/[hash].[ext]',
          },
        },
      },
      {
        test: /(\.s?css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  }
};
