const cookies = require('cookie');

function cookiesParser(options) {
    const parser = (req, res, next) => {
        const{headers:{cookie}} = req;
    
        req.parsedCookies = cookie 
            ? cookies.parse(cookie, options)
            : {};

        next();
    };

    return parser;
}

module.exports = cookiesParser;