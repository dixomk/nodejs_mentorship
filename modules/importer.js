const EventEmiter = require('events');
const fs = require('fs');
const _ = require('underscore');
const csv = require('node-csv').createParser();
const util = require('util');

class Importer extends EventEmiter {
    constructor() {
        super();

        this.importSync = this.importSync.bind(this);
        this.import = this.import.bind(this);
    }

    importSync(path) {
        const filesPathes = _.flatten([path]);
        let fullData = [];

        filesPathes.forEach(f => {
            fullData = fullData.concat(this._csvToObjectSync(f));
        });
        console.log('Sync import file');
        return fullData;
    }

    import(path) {
        const filesPathes = _.flatten([path]);
        let fullData = [];
        
        for(let i = 0; i < filesPathes.length; i++) {
            fullData.push(this._csvToObject(filesPathes[i]));
        }
        console.log('Async import file');
        return Promise.all(fullData);
    }

    destroy() {

    }

    _csvToObjectSync(filePath) {
        let csvArray = [];
        let attribs = [];
        let csvData = [];
        let buf = '';

        try{
            buf = fs.readFileSync(filePath, 'utf8');
        }catch(err) {
            console.log('Error while reding file:', err);
            return JSON.stringify([]);
        }

        csv.parse(buf, (err, data) => err ? [] : csvArray = data);

        if(csvArray.length) {
            attribs = csvArray.shift();
            csvArray.reduce((tmp, row) => {
                let obj = _.object(attribs, row);
                tmp.push(obj);
                return tmp;
            }, csvData);
        }

        return csvData;
    }

    _csvToObject(filePath) {
        const _this = this;
        return new Promise(function(resolve, reject) {
            let csvData = [];
            try{
                csvData = _this._csvToObjectSync(filePath);
            }catch(err){
                reject(err);
            }
            
            resolve(csvData);
        });
    }
}

module.exports = Importer;