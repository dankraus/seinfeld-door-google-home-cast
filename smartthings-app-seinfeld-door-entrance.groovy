/**
 *  Seinfeld Door Entrance
 *
 *  Copyright 2017 Dan Kraus
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License. You may obtain a copy of the License at:
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License
 *  for the specific language governing permissions and limitations under the License.
 *
 */
definition(
    name: "Seinfeld Door Entrance",
    namespace: "dankraus",
    author: "Dan Kraus",
    description: "Calls the node app (dankraus/seinfeld-door-google-home-cast) when door switch is opened which plays a random Seinfeld bass riff on a Google Home device. Run the node app to get the ngrok address it is live at and the IP address of the Google Home to cast too",
    category: "My Apps",
    iconUrl: "https://s3.amazonaws.com/smartapp-icons/Convenience/Cat-Convenience.png",
    iconX2Url: "https://s3.amazonaws.com/smartapp-icons/Convenience/Cat-Convenience@2x.png",
    iconX3Url: "https://s3.amazonaws.com/smartapp-icons/Convenience/Cat-Convenience@2x.png")


preferences {
    section("NodeJS app") {
		input name: "nodeAppBaseAddress", type: "text", required: true, title: "NodeJS app available at (https://123abc.ngrok.io)"
        input name: "googleHomeIP", type: "text", required: true, title: "IP Address of Google Home"
	}
    section("Sensor") {
    	input name: "door", type: "capability.contactSensor", required: true, title: "Where?"
    }
}

def installed() {
	log.debug "Installed with settings: ${settings}"

	initialize()
}

def updated() {
	log.debug "Updated with settings: ${settings}"

	unsubscribe()
	initialize()
}

def initialize() {
    state.isEntering = true;

	subscribe(door, "contact.open", doorOpenHandler)
}

def doorOpenHandler(evt) {
	log.info "Door Open Handler: ${evt}"
    state.isEntering = !state.isEntering;

    if(state.isEntering) {

        try {
            def url = "$nodeAppBaseAddress/door"
            def postParams = "ip=$googleHomeIP"

            httpPost(
                uri: url,
                body: [ip: googleHomeIP],
            ) { 
                response -> log.debug "Played Seinfeld riff. Response data: ${resp.data}"
            }
        } catch (e) {
            log.debug "Call to NodeJS app failed: ${e}"
        }
    }
}