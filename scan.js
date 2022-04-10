/*
Take an email address from our CSV and then look
it up at HIBP. We are nice and wait 2 seconds
between lookups so as to avoid slamming their system
with requests.

https://haveibeenpwned.com/API/v3  for docs.

We use unix style reporting:
No listings = silence
Any listing = that email address is returned with relevant info.

Example:
curl -X GET https://haveibeenpwned.com/api/v3/breachedaccount/void@sect.net -H "user-agent: revel_hibp" -H "hibp-api-key: deadb33f------"
[{"Name":"2844Breaches"},{"Name":"Cit0day"},{"Name":"Collection1"},{"Name":"RiverCityMedia"},{"Name":"VerificationsIO"}]%

May add this later but you get the idea:
curl -X GET https://haveibeenpwned.com/api/v3/pasteaccount/void@sect.net -H "user-agent: revel_hibp" -H "hibp-api-key: deadb33f-----"

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
// testing - let emailList = ['account-exists@hibp-integration-tests.com'];
var emailList = fs.readFileSync('emails.txt').toString().split("\n");
processAccounts();
