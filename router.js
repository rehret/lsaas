/* jshint
    esversion: 6,
    node: true
*/
(() => {
    "use strict";
    var express = require("express");
    var api = require("./api");

    var router = express.Router();

    router.use("/api", api);
    router.use(express.static("public"));

    module.exports = router;
})();