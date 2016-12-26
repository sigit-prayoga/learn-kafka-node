var http = require('http');
var express = require('express');
var app = express();

//Init kafka producer
var kafka = require('kafka-node');
var client = new kafka.Client('localhost:2181');
var producer = new kafka.Producer(client);

var payloads = [
    {
        topic: 'test',
        messages: ['message #1', 'message #2', 'message #3']
    }
];

producer.on('error', function (err) {
    console.log(err);
});

//Ready to send
producer.on('ready', function () {
    app.listen('8383', '127.0.0.1');
    console.log('Server running at http://127.0.0.1:8383/');
});

app.get('/', function (req, res) {
    console.log('preparing...');
    producer.send(payloads, function (err, data) {
        console.log('sending....');
        console.log(data);
        res.end('You are connected!!!!!        \n');
    });
});

app.get('/response', function(req, res){
    res.send('Thanks mate!');
});
