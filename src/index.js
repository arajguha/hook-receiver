const http = require('http');
const app = require('./config/express');
const { port } = require('./config/vars');

process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(-1);
});


http.createServer(app).listen(port, () => console.log(`server started in port ${port}`));