#!/usr/bin/env node
require('dotenv');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(process.env.TWILIO_ACCOUNT_SID)
console.log(process.env.TWILIO_AUTH_TOKEN)
const client = require('twilio')(accountSid, authToken);
let amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@host.docker.internal:5672/', function(error0, connection) {
  if (error0) throw error0

  connection.createChannel(function(error1, channel) {
    let queue = 'order_api'
    if (error1) throw error1
    channel.assertQueue(queue, { durable: false });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function(msg) {
      let content = JSON.parse(msg.content)
      client.messages.create(
        {
          body: `Dear ${content.name}, Your order from Online Shopping Site has been placed.`,
          from: '+19374894317',
          to: `+977${content.number}`
        }).then((msg) => {
          console.log(msg)
        })
        .catch((err) => {
          console.log(err)
        });

    }, {
        noAck: true
    });
  });
});