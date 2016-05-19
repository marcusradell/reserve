module.exports = {
  entry: './src/index.js',
  output: {
    path: 'lib',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(png)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      }
    ]
  }
}
