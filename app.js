const DirWatcher = require('./modules/dirwatcher');
const config = require('./config/');

const dirWatcher = new DirWatcher(config.dirData);

dirWatcher.on('dirwatcher:changed', (evData) => {
    console.log('>>>>>>>> directory was changed !!!!', evData);
});

dirWatcher.watch();
