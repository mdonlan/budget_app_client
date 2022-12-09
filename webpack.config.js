const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
// const styledComponentsTransformer = createStyledComponentsTransformer();

const styledComponentsTransformer = createStyledComponentsTransformer({
    getDisplayName: (filename, bindingName) => {
      let formattedFilename = '';
      filenamePaths = filename.split('/');
  
      if (filename.endsWith('index.tsx')) {
        formattedFilename = filenamePaths[filenamePaths.length - 2];
      } else {
        formattedFilename = filenamePaths[filenamePaths.length - 1];
      }
  
      return `${formattedFilename}-${bindingName}`;
    },
  });

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
                }
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        hot: true
    },
    devtool: 'source-map'

};