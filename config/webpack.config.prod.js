const webpackMerge = require('webpack-merge')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const webpackBaseConfig = require('./webpack.config.base')

const webpackConfig = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  stats: {
    children: false,
    warnings: false
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            dead_code: true,
            drop_console: false,
            drop_debugger: true
          },
          output: {
            comments: false,
            beautify: false
          },
          mangle: true,
        },
        parallel: true,
        sourceMap: false
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          enforce: true
        }
      }
    }
  }
})

module.exports = webpackConfig
