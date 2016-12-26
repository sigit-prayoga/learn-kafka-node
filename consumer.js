var http = require('http');
var request = require('request');
//Init kafka consumer
var kafka = require('kafka-node');
var client = new kafka.Client('localhost:2181');
var consumer = new kafka.Consumer(client, [{
    topic: 'test'
}]);

consumer.on('message', function (msg) {
    console.log(msg);
    request('http://127.0.0.1:8383/response', function(err, res, body){
        console.log(body);
    });
});

