module.exports = {
    entry: __dirname + '/app/index.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        port: 3000,
        contentBase: './build',
        inline: true,
        // proxy: {
        //     "/api": "http://localhost:3000"
        // }
    }
};