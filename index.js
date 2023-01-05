const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const port = 3029;
/**************************** session-authentication ************************************* */
require("dotenv").config();
const session = require("express-session");
const secret = process.env.SESSION_SECRET;
const store = new session.MemoryStore();

app.use(
    session({
        secret,
        resave: false,
        saveUninitialized: true,
        store,
    })
);
/***************************************************************** */

// OPTION I =================> this is one way to use proxy-middle-ware
app.use(
    "/simpleExpressStream",
    createProxyMiddleware({
        protected: true,
        target: "http://localhost:3044/stream",
        changeOrigin: true,
        pathRewrite: {
            [`^/simpleExpressStream`]: "",
        },
    })
);

// for OPTION II ========> see proxies23.js
var proxies_imported = require('./proxies23');
const alwaysAllow23 = (_1, _2, next) => { next(); };      // _1; underscore implies that ==> param is not important
const protected23 = (req, res, next) => {
    const { authenticated } = req.session;  
    if (!authenticated) { res.sendStatus(401); } 
    else { next(); }
};

Object.keys(proxies_imported.proxies_links23).forEach((path) => {
    const { protected, ...options } = proxies_imported.proxies_links23[path];
    const check = protected ? protected23 : alwaysAllow23;
    app.use(path, check, createProxyMiddleware(options));
});
/************************************************************/




/****************************** rate limiter *******************/
const rateLimit = require("express-rate-limit");

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,                       // 15 minutes
        max: 5,                                         // 5 calls
    })
);
/******************************************************************/







/**************************** ROUTES ************************************* */

app.get("/login", (req, res) => {
    const { authenticated } = req.session;

    if (!authenticated) {
        req.session.authenticated = true;
        res.send("Successfully authenticated");
    } else {
        res.send("Already authenticated");
    }
});

app.get("/logout", protected23, (req, res) => {
    req.session.destroy(() => { res.send("Successfully logged out"); });
});

app.get("/protected", protected23, (req, res) => {
    const { name = "user" } = req.query;
    res.send(`Hello ${name}!`);
});

app.get("/", (req, res) => {
    const { name = "user" } = req.query;
    res.send(`Hello ${name}!`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
/**************************** ROUTES ************************************* */