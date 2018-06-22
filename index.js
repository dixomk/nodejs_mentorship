const app = require('./app.js');

const port = process.env.port || 8081;

app.listen(port, () => console.log(`App listening on port ${port} !`));