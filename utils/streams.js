const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const through2 = require('through2');
const csvjson = require('csvjson');
const http = require('http');

const args = process.argv;

class CL {
    
    static doAction(options = {}) {
        const {action, help, a, h} = options;
        const gonnaDo = (help || h) ? 'help' :  action || a;
        
        if(!gonnaDo && typeof this[gonnaDo] !== 'function') {
            this.help();
            return;
        }
        console.log('>>>>', gonnaDo, options);
        this[gonnaDo](options);
    }

    static reverse() {
        process.stdin.pipe(through2(function (chunk, encoding, next) {
            const tmp = chunk.toString();
            this.push([...tmp].reverse().join('') + '\n');
            next();
        })).pipe(process.stdout);
    }

    static transform() {
        process.stdin.pipe(through2(function (chunk, encoding, next) {
            const tmp = chunk.toString();
            this.push(tmp.toUpperCase() + '\n');
            next();
        })).pipe(process.stdout);
    }

    static outputFile({file, f}) {
        const filePath = file || f;
        
        if(!this.validateFilePath(filePath)) {
            this.help();
            return;
        }

        const fullPath = path.resolve(__dirname, filePath);
        const fsStream = fs.createReadStream(fullPath);
        
        fsStream.on('error', err => {
            console.log('Error during create read stream: ', err);
        });

        fsStream.pipe(process.stdout);
    }

    static convertFromFile({file, f}) {
        const filePath = file || f;
        
        if(!this.validateFilePath(filePath)) {
            this.help();
            return;
        }

        const fullPath = path.resolve(__dirname, filePath);
        const fsStream = fs.createReadStream(fullPath);
        const toObject = csvjson.stream.toObject();
        const stringify = csvjson.stream.stringify();   

        fsStream.on('error', err => {
            console.log('Error during create read stream: ', err);
        });

        fsStream.pipe(toObject)
            .pipe(stringify)
            .pipe(process.stdout);
    }

    static convertToFile({file, f}) {
        const filePath = file || f;
       
        if(!this.validateFilePath(filePath)) {
            this.help();
            return;
        }

        const fullPath = path.resolve(__dirname, filePath);
        const fsRead = fs.createReadStream(fullPath);
        const fsWrite = fs.createWriteStream(fullPath.replace('.csv', '.json'));
        const toObject = csvjson.stream.toObject();
        const stringify = csvjson.stream.stringify();   

        fsRead.on('error', err => {
            console.log('Error during create read stream: ', err);
        });

        fsRead.pipe(toObject)
            .pipe(stringify)
            .pipe(fsWrite);
    }

    static cssBundler({path:dir, p}) {
        const dirPath = dir || p;
        const fullDirPath = path.resolve(__dirname, dirPath);
        const outputFile = path.join(fullDirPath, '/bundle.css');
        this.getFilesFromDir(fullDirPath)
            .then(files => this.readFiles(files))
            .then(data => {
                this.writeBundle({data, options: {output: outputFile, separator: ''}});
            })
            .then(() => {
                http.get('http://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css', response => response.pipe(fs.createWriteStream(outputFile, {flags: 'a'})));
            })
            .catch(err => console.log('Error:', err));

    }

    static help() {
        console.log(`
            streams.js
            ---
            actions: reverse, transform, ouputFile, convertFromFile, convertToFile, cssBuilder;
            ---
            options: --action(or -a), --file(or -f), --path(or -p), --help(or -h)
            ---
            rules of using:
                reverse: --action=reverse or -a reverse
                transform: --action=transform or -a transform
                ouputFile: --action=ouputFile --file=users.csv or -a ouputFile -f test.txt
                convertFromFile: --action=convertFromFile --file=users.csv or -a convertFromFile -f users.csv
                convertToFile: --action=convertToFile --file=users.csv or -a convertToFile -f users.csv
                cssBuilder: --action=cssBuilder --path=./ssets/css or -a cssBuilder -p ./ssets/css
        `);
    }
    
    static getFilesFromDir(dirPath) {
        if(!this.validateFilePath(dirPath)) {
            this.help();
            return Promise.reject(new Error('param "path" should be valid !!'));
        }

        return new Promise(function (resolve, reject) {
            fs.readdir(dirPath, function (err, files) {
                if(err) {
                    reject(err);
                    return;
                }
    
                var cssFiles = files.filter(function (filename) {
                    return filename.match(/\.css$/);
                }).map(function (filename) {
                    return dirPath + '/' + filename;
                });
    
                resolve(cssFiles);
            });
        });
    }

    static readFiles(files) {
        // files.push('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css');
        const promises = files.map(function (path) {
            return new Promise(function (resolve, reject) {
                console.log('read file ' + path);
    
                fs.readFile(path, 'utf-8', function (err, data) {
                    if(err) {
                        return reject(err);
                    }
    
                    resolve(data);
                });
            });
        });
    
        return Promise.all(promises);
    }

    static writeBundle({data, options}) {
        const outputPath = options.output,
            separator = options.separator + '\n' || '\n';
    
        console.log('write file ' + outputPath);
    
        return new Promise(function (resolve, reject) {
            let content = data.join(separator);
            content ='\n' + content;
    
            fs.writeFile(outputPath, content, 'utf-8', function (err) {
                if(err) {
                    reject(err);
                    return;
                }
    
                resolve(outputPath);
            });
        });
    }

    static validateFilePath(filePath) {
        return (typeof filePath !== 'string') ? false : true;
    }
}

CL.doAction(minimist(args.slice(2)));