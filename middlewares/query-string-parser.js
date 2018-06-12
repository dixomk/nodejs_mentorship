const urlParser = require('url');

function queryParser() {
    const parser = (req, res, next) => {
        const parsedUrl = urlParser.parse(req.url, true);

        req.parsedQuery = parsedUrl.query;

        next();
    };

    return parser;
}

module.exports = queryParser;