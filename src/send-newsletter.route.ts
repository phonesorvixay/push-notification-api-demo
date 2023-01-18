import { USER_SUBSCRIPTIONS } from "./in-memory-db";
import { Request, Response } from "express";
const webpush = require('web-push');


export function sendNewsletter(req: Request, res: Response) {

    console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

    // sample notification payload
    const notificationPayload = {
        notification: {
            title: "Internal Deposit ✅",
            body: "From: Mr. Somsuk",
            // body: "From: Mr. Somsuk \nAmount: $200 \nTo: Mr. Phone",
            icon: 'assets/icons/logo-512x512.png',
            vibrate: [100, 50, 100],
            data: {
                "dateOfArrival": Date.now(),
                "primaryKey": 1,
                // url: 'https://www.youtube.com'
            },
            actions: [{
                "action": "explore",
                "title": "Go to the site"
            }
            ]
        }
    };


    Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload))))
        .then(() => res.status(200).json({ message: 'Newsletter sent successfully.' }))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
}


// async function getPublicIp() {
//     const options = { timeout: 1500 }
//     const ip = await publicIp.v4(options);
//     console.log(ip);
// }
// getPublicIp();

