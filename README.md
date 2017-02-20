#Seinfeld Door Bass Riff SmartThings and Google Home Cast

Casts a random Seinfeld transition bass riff or a HTTPS accessible MP3 through a Google Home device on your network. Can run on its own
or triggered with a custom SmartThings app.

##Usage

###Node
Run `node app.js` first time and it will log the castable devices to your network. 
The app will run at `http://localhost:3000` and also a publiclly available address via ngrok like `https://1234.ngrok.io`.

Make an HTTP POST request to `/door` with a field called "ip" and the value of the IP address of the Google Home device on your network
that was logged to the console. You don't need the port number. Ex:

`curl -X POST -d "ip=192.168.1.215" https://1234.ngrok.io/door`

Your Google Home will play a chime sound when the connection is made and then play a random MP3 from the `riffs` array in
`app.js`

You can also play any MP3 from a URL with:

`curl -X POST -d "ip=192.168.1.215&url=https://s3-us-west-2.amazonaws.com/blog-spokeo-test/seinfeld.mp3" https://1234.ngrok.io/url`

Please note that the MP3 MUST be served over HTTPS.

###SmartThings
Set up an API account according to the SmartThings docs. Go to My SmartApps>New SmartApp. 
Click the "From Code" tab, copy and paste the contents of `smartthings-app-seinfeld-door-entrance.groovy` and click 'Create'.
From the SmartThings app, go to Automation>SmartApps>Add a SmartApp>My Apps and select Seinfeld Door Entrance. 
Enter the ngrok address from the node app setup and the IP address of the Google Home you wish to cast too. Then select your door sensor.

When the door opens, an HTTP POST request is made to the node app, the node app connects to the Google Home and casts an MP3 to it.