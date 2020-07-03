import express from 'express';
import bodyParser from 'body-parser';
import { initBot } from './bot.js';

export const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hi, I\'m a bot. Beep boop...');
});

initBot();

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`The app is listening on port ${port}!`);
});
