const http = require('http');

const port = process.env.port || 3000;
const testData = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        {color: 'blue'},
        {size: 'XL'}
    ]
};

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(testData));
});

server.listen({port}, () => {
    console.log(`Server starts at ${port} port`);
});