exports.proxies_links23 = {                                 // it has "2 paths" at the moment
    "/simpleExpressQuote": {                                    // simpleExpressQuote
        protected: true,                                        // simpleExpressBuffer
        target: "http://localhost:3044/quote",                  // each path has some Info
        changeOrigin: true,                                     // --> protected, target, changeOrigin, etc
        pathRewrite: {
            [`^/simpleExpressQuote`]: "",
        },
    },
    "/simpleExpressBuffer": {
        protected: false,
        target: "http://localhost:3044/buffer",
        changeOrigin: true,
        pathRewrite: {
            [`^/simpleExpressBuffer`]: "",
        },
    }
};