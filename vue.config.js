const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

const BASE_URL = process.env.NODE_ENV === 'procution' ? '' : '/'
module.exports = {
  lintOnSave: false,
  publicPath: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('img', resolve('src/assets/img'))
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    proxy: 'http://localhost:4000/'
  }
}
