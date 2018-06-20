const http = require('http');

const port = process.env.port || 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World !');
});

server.listen({port}, () => {
    console.log(`Server starts at ${port} port`);
});