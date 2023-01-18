
const bodyParser = require('body-parser');
import express, { Application } from 'express';
import { sendNewsletter } from "./send-newsletter.route";
import { readAllLessons } from "./read-all-lessons.route";
import { addPushSubscriber } from "./add-push-subscriber.route";

const webpush = require('web-push');
const cors = require('cors');


const Vapid_keys = { "publicKey": "BPhCT9yPR218QWq-bbFvWAL7jENvMd3Q55UIPl5P1Fh0H4-ttAy01HXM5QjP9TljuIKDVTiQVdS32XaojSUKUhA", "privateKey": "h2eAqRH2f0xXmXIQePTfISFWtDGwnqKmywBR050aV7k" }


webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    Vapid_keys['publicKey'],
    Vapid_keys['privateKey']
);




const app: Application = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: "*",
    exposedHeaders: ["accessToken"],
    withCredentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({ status: true, message: "hello" })
})


// REST API
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/notifications')
    .post(addPushSubscriber);

app.route('/api/newsletter')
    .post(sendNewsletter);

// app.post('/subscribe', (req, res) => {
//     const subscription = req.body;
//     res.set('Content-Type', 'application/json');
//     webpush.setVapidDetails('mailto:you@domain.com', Vapid_keys['publicKey'], Vapid_keys['privateKey'])

//     const userSubscription = [1, 2, 3, 4]

//     let notificationPayload = JSON.stringify({
//         notification: {
//             title: 'push_Notification',
//             body: 'subscribe',
//             icon: 'assets/icons/icon-512x512.png',
//             data: {
//                 "dateOfArrival": Date.now(),
//                 "primaryKey": 12
//             },
//             actions: [{
//                 "action": "explore",
//                 "title": "Go to the site"
//             }],
//             vibrate: [200, 100, 200],
//         }
//     });

//     Promise.resolve(webpush.sendNotification(subscription, notificationPayload))
//         .then(() => {
//             res.status(200).json({
//                 message: 'Notification sent'
//             })
//         }).catch(err => {
//             console.log(err);
//             res.sendStatus(500)
//         })
// })

// Express configuration

// launch an HTTP Server
const httpServer = app.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:" + 3000);
});











