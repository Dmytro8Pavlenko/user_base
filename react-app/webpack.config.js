const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, '../public')
    },
};