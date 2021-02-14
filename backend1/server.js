const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5001;
var amqp = require('amqplib/callback_api');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.post('/api/order', (req, res) => {
  amqp.connect('amqp://guest:guest@host.docker.internal:5672/', function(error0, connection) {
    if (error0) throw error0
    connection.createChannel(function(error1, channel) {
      if (error1) throw error1
      var queue = 'order_api'
      var msg = req.body.user_details

      channel.assertQueue(queue, { durable: false })
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)))
      console.log('Order placed in queue')
      
      res.status(200).send({ message: `Hi ${req.body.user_details.name}. We received your order of ${req.body.user_details.product_name}. You'll receive notification about the product in your phone number ${req.body.user_details.number}. Thank you.` });
    })
  })
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));