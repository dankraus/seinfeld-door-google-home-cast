var CastClient = require('castv2-client').Client;
var DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;
var mdns = require('mdns');
var browser = mdns.createBrowser(mdns.tcp('googlecast'));

var exports = module.exports = {};

exports.castUrl = function(ip, url, callback) {
    var client = new CastClient();
    console.log('Starting to cast URL: ' + url);
    
    client.connect(ip, function () {
        console.log('Connected to: ' + ip);
        client.launch(DefaultMediaReceiver, function (err, player){
            var media = {
                contentId: url,
                contentType: 'audio/mp3',
                streamType: 'BUFFERED'
            };

            player.load(media, { autoplay: true }, function (err, status){
                client.close();
                console.log('Casting URL: ' + url);
                callback('success');
            });
        });
    });

    client.on('error', function (err) {
        console.log('Error: %s', err.message);
        client.close();
        callback('error', err);
    });
};

exports.getCastDevices = function() {
    browser.on('serviceUp', function(service) {
        console.log('found device "%s" at %s:%d', service.name, service.addresses[0], service.port);
        browser.stop();
    });

    browser.start();
}