# DarkScan

## INTRODUCTION
Been a while since I wrote any code and I wanted to dust off the skills so I had the idea to write this little script.

It reads a list of email addresses from emails.txt (one per line) then checks them at the HIBP API. Status code of 200 is a good thing, so we return the response data. Otherwise just silently move on to the next entry.

You can just read the code to learn more, it is very basic.

## REQUIREMENTS
* You need node 14+ maybe older, but that's what I'm running on MacOS and this works fine.
* An API Key for HIBP which costs you 4 dollars.
* A sense of humour
* An appreciation for British spelling

## To make it go (basically)
export HIBPKEY=12345; npm install; node scan.js