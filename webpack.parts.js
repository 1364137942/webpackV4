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