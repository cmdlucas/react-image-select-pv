var path = require('path');
 
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}