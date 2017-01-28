/* jshint
    esversion: 6,
    node: true
*/
(() => {
    "use strict";
    var express = require("express");
    var router = require("./router");
    var port = process.argv[2] || 8000;

    var app = express();

    app.use(router);

    app.listen(port, () => {
        console.log(`Server listening on :${port}`);
    });
})();