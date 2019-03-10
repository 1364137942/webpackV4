const MiniCssExtractPlugin = require("mini-css-extract-plugin");


exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only",
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        open: true,
        overlay: true,//错误捕抓
        watchOptions: {
            // Delay the rebuild after the first change
            aggregateTimeout: 300, //延迟300毫秒变化，可以把这段时间内的变化都合并在一起

            // Poll using interval (in ms, accepts boolean too)
            poll: 1000, //每秒检查一次变动
        }
    },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,

                use: ["style-loader", "css-loader"],
            },
        ],
    },
});

//分离css，只能用在生产环境
exports.extractCSS = ({ include, exclude, use = [] }) => {
    // Output extracted CSS to a file
    const plugin = new MiniCssExtractPlugin({
        filename: "[name].css",
        //filename: "styles/[name].css", //打包到另外的文件
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,

                    use: [
                        MiniCssExtractPlugin.loader,
                    ].concat(use),
                },
            ],
        },
        plugins: [plugin],
    };
};

const PurifyCSSPlugin = require("purifycss-webpack");

exports.purifyCSS = ({ paths }) => ({
    plugins: [new PurifyCSSPlugin({ paths })],
});


exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()],
    },
});