//const client = require("../db.js");
//import client from '../db';
const accountSid1 = "ACef17d4d484c5b16";
const accountSid2 = "92e7cecdcf64cdddb";
const accountSid = accountSid1+accountSid2;
const authToken1 = "dffd44ad5694699";
const authToken2 = "q609a531d3d7a7eee3";
const authToken = authToken1 + authToken2;
const tclient = require('twilio');
let twclient = new tclient(accountSid,authToken);

function sendSMS(req,res){
    console.log(req.body);
    twclient.messages.create({
        body: req.body.message,
        messagingServiceSid:
            "MGd5e7845010b108d1605feb14082f12e1",
        from: "+18655357463",
        to: "+91" + req.body.p_num,
    })
    .then((message) => console.log(message.sid))
    .done();
};
exports.sendSMS  = sendSMS;


