const DirWatcher = require('./modules/dirwatcher');
const Importer = require('./modules/importer');

const config = require('./config/');
const {constants:{EVENTS}, dirData} = config;

const dirWatcher = new DirWatcher(dirData);
const importer = new Importer();

dirWatcher.on(EVENTS.dirChanged, (files) => {
    importer.import(files)
        .then(data => console.log(data))
        .catch(err => console.log(err));
});

// dirWatcher.on(EVENTS.dirChanged, importer.importSync);

dirWatcher.watch();
