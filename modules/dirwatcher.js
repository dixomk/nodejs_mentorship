const EventEmiter = require('events');
const fs = require('fs');
const path = require('path');

const {constants:{EVENTS, fileExts}} = require('../config');

class DirWatcher extends EventEmiter {

    constructor(path='', delay=200) {
        super();
        this.dirPath = path;
        this.fullDirPath = '';
        this.delay = delay;
        this._listFiles = [];
        this._timer = null;

        this._checkDirState = this._checkDirState.bind(this);
    }

    watch(pathWatch='', delay) {
        this.destroy();

        pathWatch ? this.dirPath = pathWatch : null;
        this.fullDirPath = path.resolve(__dirname, this.dirPath);

        this._timer = setInterval(this._checkDirState, delay || this.delay);
    }

    destroy() {
        this.fullDirPath = '';
        this._listFiles = [];

        clearInterval(this._timer);
    }

    _checkDirState() {
        let newListFiles = this._readDir();
        let differences;

        if(newListFiles.length) {
            differences = this._getDifferences(newListFiles)

            if(differences.length) {
                this._listFiles = [].concat(this._listFiles, differences);
                this.emit(EVENTS.dirChanged, [...differences]);
            }
        }else {
            this._listFiles = [];
        }
    }

    _readDir() {
        let files = [];

        try{
            files = fs.readdirSync(this.fullDirPath);
        }catch(err) {
            console.log('Error while reading dirrectory: ', err);
            return [];
        }

        return files.reduce((tmp, f) => {
            let pointIndex = f.indexOf('.');
            let ext = f.substring(pointIndex);

            if(pointIndex == -1 || fileExts.indexOf(ext) == -1) return tmp;

            let fileWithFullPath = `${this.fullDirPath}\\${f}`;
            tmp.push(fileWithFullPath);

            return tmp;

        }, []);
    }

    _getDifferences(dirContent = []) {
        return dirContent.reduce((dif, nextFile) => {
            this._listFiles.indexOf(nextFile) !== -1 ? null : dif.push(nextFile);

            return dif;
        }, []);
    }

}

module.exports = DirWatcher;
