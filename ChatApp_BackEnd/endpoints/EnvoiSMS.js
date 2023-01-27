const API_TOKEN = 'NThkMGVhMjU4N2E3OjhiMjBkMjFiLTFjNGYtNGE3ZS05ZTMyLTdkMTYyNjNkNjFkOQ==';
const CANAL_ID = 'cPjD5Fz9QsT4CbAyh'

const axios = require('axios');

module.exports.sendSms = async (tel, message) => {

  const headers = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json',
    Authorization: `Basic ${API_TOKEN}`,

  }

  const data ={
    "phoneNumber": tel,
    "message": message,
    "mediaUrl": "",
    "externalId": "",
    "lineId": CANAL_ID
 }

 const url = 'https://asap-desk.com/api/v0/whatsapp/message'

 await axios.post(url, data, {
  headers: headers
})
.then((response) => {
  console.log(response)

})
.catch((error) => {
  console.log(error)
})
  
 /*
  const resp = await fetch(
    'https://asap-desk.com/api/v0/whatsapp/message',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + API_TOKEN
      },
      body: JSON.stringify({
        "phoneNumber": tel,
        "message": message,
        "mediaUrl": "",
        "externalId": "",
        "lineId": CANAL_ID
     })
    }
  );

  const dat = await resp.json();
  console.log(dat);
  */
}