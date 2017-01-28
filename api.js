/* jshint
    esversion: 6,
    node: true
*/
(() => {
    "use strict";
    var jimp = require("jimp");
    var express = require("express");

    var router = express.Router();

    var imagePath = `${__dirname}/lemonysnicket.jpg`;
    var xPadding = 10;

    // This function is copied from the Jimp implmentation
    // (https://github.com/oliver-moran/jimp/blob/master/index.js#L2381)
    // License: https://github.com/oliver-moran/jimp/blob/master/LICENSE
    // Once https://github.com/oliver-moran/jimp/pull/199 has been merged, this can be removed
    function measureText(font, text) {
        var x = 0;
        for (var i = 0; i < text.length; i++) {
            if (font.chars[text[i]]) {
                x += font.chars[text[i]].xoffset
                    + (font.kernings[text[i]] && font.kernings[text[i]][text[i+1]] ? font.kernings[text[i]][text[i+1]] : 0)
                    + (font.chars[text[i]].xadvance || 0);
            }
        }
        return x;
    }

    function getLinesOfText(font, text, maxWidth) {
        var words = text.split(" ");
        var lines = [];
        var line = "";

        words.forEach((word) => {
            if (measureText(font, `${line} ${word}`) > maxWidth) {
                lines.push(line);
                line = word;
            } else {
                line = `${line} ${word}`;
            }
        });
        lines.push(line);

        return lines;
    }

    function writeTextToImage(image, font, text, maxWidth) {
        var lineHeight = font.common.lineHeight;
        var yPadding = 1.5 * lineHeight;
        var y = image.bitmap.height - yPadding - lineHeight;

        var lines = getLinesOfText(font, text, maxWidth);

        // print all lines starting with the last one so we know where the others are placed on the y-axis
        lines.reverse();
        lines.forEach((line) => {
            var x = (image.bitmap.width / 2) - (measureText(font, line) / 2) + xPadding;
            image.print(font, x, y, line);
            y -= lineHeight;
        });

        return image;
    }

    router.get("/", (req, res) => {
        var text =  req.query.text || "";

        res.contentType("image/jpeg");

        jimp.read(imagePath).then((image) => {
            jimp.loadFont(jimp.FONT_SANS_32_WHITE).then((font) => {
                var width = image.bitmap.width - (2 * xPadding);
                image = writeTextToImage(image, font, text, width);

                image.getBuffer(jimp.AUTO, (error, buffer) => {
                    if (!error) {
                        res.end(buffer);
                    } else {
                        console.error(`Error: ${error}`);
                        res.end();
                    }
                });
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
                res.end();
            });
        })
        .catch((error) => {
            console.error(`Error: ${error}`)  ;
            res.end();
        });
    });

    module.exports = router;
})();