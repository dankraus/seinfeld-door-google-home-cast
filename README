#Seinfeld Door Bass Riff Google Home Cast

Casts a random Seinfeld transition bass riff through a Google Home device on your network.

##Usage
Run `node app.js` first time and it will log the castable devices to your network. 
The app will run at `http://localhost:3000` and also a publiclly available address via ngrok like `https://1234.ngrok.io`.

Make an HTTP POST request to `/door` with a field called "ip" and the value of the IP address of the Google Home device on your network
that was logged to the console. Ex:

`curl -X POST -d "ip=192.168.1.215" https://1234.ngrok.io/door`

Your Google Home will play a chime sound when the connection is made and then play a random MP3 from the `riffs` array in
`app.js`

You can also play any MP3 from a URL with:

`curl -X POST -d "ip=192.168.1.215&url=https://s3-us-west-2.amazonaws.com/blog-spokeo-test/seinfeld.mp3" https://1234.ngrok.io/url`

Please note that the MP3 MUST be served over HTTPS.