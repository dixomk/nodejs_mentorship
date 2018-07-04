const app = require('./app.js');
const dbProvider = require('./models');

const port = process.env.port || 8081;

// dbProvider.sequelize.sync()
//    .then(() => {
        app.listen(port, () => console.log(`App listening on port ${port} !`));
//    });
