var EventEmiter = require('events');
var fs = require('fs');
var path = require('path');

class DirWatcher extends EventEmiter {

    constructor(path='', delay=200) {
        super();
        this.dirPath = path;
        this.fullDirPath = '';
        this.delay = delay;
        this._listFiles = [];
        this._timer = null;
        this.eventName = 'dirwatcher:changed';

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
        let newListFiles = fs.readdirSync(this.fullDirPath);
        let differences;

        if(newListFiles.length) {
            differences = this._getDifferences(newListFiles)

            if(differences.length) {
                this._listFiles = [].concat(this._listFiles, differences);
                this.emit(this.eventName, {differences});
            }
        }
    }

    _getDifferences(dirContent = []) {
        return dirContent.reduce((dif, nextFile) => {
            this._listFiles.indexOf(nextFile) !== -1 ? null : dif.push(nextFile);

            return dif;
        }, []);
    }

}

module.exports = DirWatcher;
