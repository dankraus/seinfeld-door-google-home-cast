var express = require('express');
var bodyParser = require('body-parser');
var ngrok = require('ngrok');

var googleHomeUrlCaster = require ('./googleHomeUrlCaster');

var app = express();
var serverPort = 3000;
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var riffCount = 90;


googleHomeUrlCaster.getCastDevices();

app.get('/', function (req, res){
    console.log('GET /');
    res.send('Ping');
});

app.post('/door', urlencodedParser, function (req, res){
    var ip = req.body.ip;

    console.log('POST /door');

    var trackNumber = Math.floor(Math.random() * riffCount) + 1;
    var riffUrl = 'https://storage.googleapis.com/seinfeld-riffs/Dan%20Seinfeld%20' + trackNumber + '.mp3';
    
    if(ip) {
        googleHomeUrlCaster.castUrl(ip, riffUrl, function(result, err){
            if(!err) {
                res.send('Played ' + riffUrl + ' on '+ ip);
            }
        });
    } else {
        res.status(400).send('Please POST "ip=192.168.1.215"');
    }
});

app.post('/url', urlencodedParser, function (req, res){
    var ip = req.body.ip;
    var url = req.body.url;

    console.log('POST /url');
    
    if(ip && url) {
        googleHomeUrlCaster.castUrl(ip, url, function(result, err){
            if(!err) {
                res.send('Played ' + url + ' on ' + ip);
            }
        });
    } else {
        res.status(400).send('Please POST "ip=192.168.1.215&url=https://s3-us-west-2.amazonaws.com/blog-spokeo-test/seinfeld.mp3"');
    }
});

app.listen(serverPort, function() {
    ngrok.connect(serverPort, function (err, url){
        console.log('Listening at http://localhost:' + serverPort);
        console.log('Available at ' + url);
        console.log('example:');
        console.log('curl -X POST -d "ip=192.168.1.215" ' + url + '/door');
    })
});
