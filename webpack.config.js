const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const parts = require("./webpack.parts");
const path = require("path");

const glob = require("glob");

const webpack = require("webpack");


const PATHS = {
    app: path.join(__dirname, "src"),
};
const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack demo",
            }),
            // Ignore node_modules so CPU usage with poll
            // watching drops significantly.
            new webpack.WatchIgnorePlugin([
                path.join(__dirname, "node_modules")
            ]),
        ],
    },
    // parts.loadCSS(),
]);

const productionConfig = merge([
    parts.extractCSS({
        // use: "css-loader",
        use: ["css-loader", parts.autoprefix()], //使用浏览器前缀自动补齐
    }),
    //需要用在MiniCssExtractPlugin后面，用来去掉没有用到的css，减少体积
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),
]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),

]);

module.exports = (mode) => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
};
