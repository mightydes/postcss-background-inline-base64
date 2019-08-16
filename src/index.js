const postcss = require('postcss');
const path = require('path');
const fs = require('fs');

module.exports = postcss.plugin('inline-base64', (opts) => {
    opts = opts || {};

    return function (css, result) {
        css.walkDecls(/^background(-image)?$/, (decl) => {
            let b64 = decl.value.indexOf('url') > -1
                && decl.raws.value !== undefined
                && decl.raws.value.raw !== undefined
                && decl.raws.value.raw.indexOf('b64') > -1;
            if (b64) {
                let rel = decl.value.replace(/^url\s*\(\s*['"]|['"]\s*\)\s*$/g, '');
                let filePath = path.normalize(
                    path.join(path.dirname(result.opts.from), rel)
                );
                decl.value = `url("data:${extToMime(path.extname(filePath))};base64,${fs.readFileSync(filePath, 'base64')}")`;
            }
        });
    };
});


// FUNCTIONS:

function extToMime(dotExt) {
    switch (dotExt.toLowerCase()) {
        case '.gif':
            return 'image/gif';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        default:
            throw new Error(`[postcss-background-inline-base64] Unknown file extension '${dotExt}' mime type!`);
    }
}
