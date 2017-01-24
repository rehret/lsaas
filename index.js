var jimp = require("jimp");

var imagePromise = jimp.read("lemonysnicket.jpg");
var fontPromise = jimp.loadFont(jimp.FONT_SANS_32_WHITE);

var promises = [imagePromise, fontPromise];

Promise.all(promises).then(function() {
    console.log("All loaded");
});
