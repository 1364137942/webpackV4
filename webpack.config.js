const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const parts = require("./webpack.parts");
const path = require("path");
const webpack = require("webpack");

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
]);

const productionConfig = merge([]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
]);

module.exports = (mode) => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
};
