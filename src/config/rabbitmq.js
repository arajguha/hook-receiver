const amqplib = require('amqplib');
const set = require('set-value');
const { messageQueue, queueName } = require('./vars');

const connect = async () => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
    
        // const ch1 = await conn.createChannel();
        // await ch1.assertQueue(queue);
    
        // Listener
        //   ch1.consume(queue, (msg) => {
        //     if (msg !== null) {
        //       console.log('Recieved:', msg.content.toString());
        //       ch1.ack(msg);
        //     } else {
        //       console.log('Consumer cancelled by server');
        //     }
        //   });
    
        // Sender
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
    messageQueue.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
};

// ch2.sendToQueue(queue, Buffer.from('something to do'));

module.exports = { connect, sendMessageToQueue };