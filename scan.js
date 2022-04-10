/*
Take an email address from our CSV and then look
it up at HIBP. Wait 2 seconds.

We use unix style reporting:
No listings = silence (Not a 200 http status)
Any listing = that email address is returned with the list of breaches it is in.
*/

import fetch from "node-fetch";
import fs from "fs";
const hibpKey = process.env.HIBPKEY;

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

async function processAccounts () {
    for ( const account of emailList) {
        let url = `https://haveibeenpwned.com/api/v3/breachedaccount/${account}`;
        let urlParams = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'hibp-api-key': hibpKey
            },
        }
        const response = await fetch(url, urlParams);
        if (response.status == 200) {
        const data = await response.json();
        console.log(`Account Found: ${account}`);
        console.log(data); }
        sleep(2000);
    }
}

//main
var emailList = fs.readFileSync('emails.txt').toString().split("\n");
processAccounts();
