import nodemailer from "nodemailer";
import {google} from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
let REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAUth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oAUth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
// console.log(oAUth2Client);

export default async function sendMail(mailOptions){
    try{
        const accessToken = await oAUth2Client.getAccessToken();
        REFRESH_TOKEN = accessToken;
        const transport = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                type: "OAuth2",
                user: "epicarehms@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const result = await transport.sendMail(mailOptions)
        if(result)
            console.log("Email sent");
        // return result
    } catch(error){
        return error
    }
}

sendMail({
    from: `RABID 📧 <rabiddog@gmail.com>`,
    to: "mandonginnocent88@gmail.com",
    subject: "Hello from rabid dog using gmail API",
    text: "You got it right",
    html: '<h1>Hello from rabid dog using gmail API</h1>',
    replyTo: "No reply"
})
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message))