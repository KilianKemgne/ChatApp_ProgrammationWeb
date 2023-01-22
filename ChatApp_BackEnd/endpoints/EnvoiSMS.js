
const API_TOKEN = 'YOUR_API_token';


import fetch from 'node-fetch';

module.exports.sendSms = async (tel, message) => {
  const resp = await fetch(
    'https://asap-desk.com/api/v0/sms/message',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      },
      body: JSON.stringify({
        "phoneNumber": tel,
        "message": message,
        "externalId": "",
        "lineId": ""
     })
    }
  );

  const data = await resp.json();
  console.log(data);
}