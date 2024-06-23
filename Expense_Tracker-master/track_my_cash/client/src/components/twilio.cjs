const accountSid = "ACef17d4d484c5b1692e7cecdcf64cdddb";
const authToken = "dffd44ad5694699609a531d3d7a7eee3";
const tclient = require('twilio');
let twclient = new tclient(accountSid,authToken);

function sendSMS (req,res) {
    console.log(req.body);
    twclient.messages.create({
        body: "Hello",
        messagingServiceSid:
            "MGd5e7845010b108d1605feb14082f12e1",
        from: "+18655357463",
        to: "+919752438758",
    })
    .then((message) => console.log(message.sid))
    .done();
};
module.exports(sendSMS());
// export default tclient