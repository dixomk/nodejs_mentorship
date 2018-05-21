const minimist = require('minimist');
const through2 = require('through2');
const args = process.argv;

class CL {
    
    static doAction(options = {}) {
        const {action, help, a, h} = options;
        const gonnaDo = help || h || action || a;
        
        if(!gonnaDo && typeof this[gonnaDo] !== 'function') {
            this.errorInfo();
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
    static transform(str) {}
    static outputfile(filePath) {}
    static convertFromFile(filePath) {}
    static convertToFile(filePath) {}
    static help() {}
    static errorInfo() {
        console.log('Error with arguments !!!');
    }
}

CL.doAction(minimist(args.slice(2)));