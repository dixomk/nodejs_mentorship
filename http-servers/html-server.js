const http = require('http');
const fs = require('fs');
const through2 = require('through2');

const port = process.env.port || 3000;
const fileName = 'index.html';
const msg = 'Hi, my name is Kostya :)';

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const fsRead = fs.createReadStream(fileName, {encoding:'utf8'});

    // approach with streams
    fsRead.pipe(through2.obj(function(chunck, enc, done) {
        this.push(chunck.toString().replace('{message}', msg));
        done();
    }))
    .pipe(res);

    // approach with sync reading file
    /*try{
        let template = fs.readFileSync(fileName)
            .toString()
            .replace('{message}', msg);
        res.end(template);
    }catch(err) {
        res.end(`Error while readding file, code: ${err.code}`);
    }*/
});

server.listen({port}, () => {
    console.log(`Server starts at ${port} port`);
});