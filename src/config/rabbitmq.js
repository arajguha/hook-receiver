const amqplib = require('amqplib');
const set = require('set-value');
const { messageQueue, queueName } = require('./vars');

const connect = async () => {
    try {
        const connection = await amqplib.connect(`amqp://${messageQueue.host}:${messageQueue.port}`);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        set(messageQueue, 'connection', connection);
        set(messageQueue, 'channel', channel);

        console.log('rabbitMQ connection has been setup');

    } catch (error) {
        console.log('error while connecting to rabbitmq ', error);
        process.exit(-1);
    }
};

const sendMessageToQueue = async (data) => {
    messageQueue.channel.sendToQueue(
        queueName, 
        Buffer.from(JSON.stringify(data)),
        { persistent: true }
    );
};

// ch2.sendToQueue(queue, Buffer.from('something to do'));

module.exports = { connect, sendMessageToQueue };