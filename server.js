/* jshint
    esversion: 6,
    node: true
*/
(() => {
    "use strict";
    var express = require("express");
    var api = require("./api");
    var port = process.argv[2] || 8000;

    var app = express();

    app.all("*", api);

    app.listen(port, () => {
        console.log(`Server listening on :${port}`);
    });
})();