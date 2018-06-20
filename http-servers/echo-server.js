const http = require('http');
const urlParser = require('url');

const port = process.env.port || 3000;
// localhost:3000/echo?msg=value
const server = http.createServer((req, res) => {
    let parsedUrl = urlParser.parse(req.url, true);
    const{pathname, query:{msg}} = parsedUrl;
    (pathname == '/echo' && msg) ? res.end(msg)
        : req.pipe(res);
});

server.listen({port}, () => {
    console.log(`Server starts at ${port} port`);
});