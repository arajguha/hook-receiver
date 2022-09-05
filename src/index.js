const http = require('http');
const app = require('./config/express');
const { port } = require('./config/vars');
const rabbitMq = require('./config/rabbitmq');

process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(-1);
});

rabbitMq
    .connect()
    .then(() => {
        http.createServer(app).listen(port, () => console.log(`server started in port ${port}`));
    })
    .catch(err => {
        console.log('error in startup ', error);
        process.exit(-1);
    });
