const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const through2 = require('through2');
const csvjson = require('csvjson');

const args = process.argv;

class CL {
    
    static doAction(options = {}) {
        const {action, help, a, h} = options;
        const gonnaDo = (help || h) ? 'help' :  action || a;
        
        if(!gonnaDo && typeof this[gonnaDo] !== 'function') {
            this.help();
            return;
        }

        this[gonnaDo](options);
        console.log('do action', gonnaDo);
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
        const fullPath = path.resolve(__dirname, filePath);
        const fsStream = fs.createReadStream(fullPath);
        
        fsStream.on('error', err => {
            console.log('Error during create read stream: ', err);
        });

        fsStream.pipe(process.stdout);
        
       
    }

    static convertFromFile({file, f}) {
        const filePath = file || f;
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

    static help() {}
    static errorInfo() {
        console.log('Error with arguments !!!');
    }
}

CL.doAction(minimist(args.slice(2)));