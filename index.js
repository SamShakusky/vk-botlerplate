import express from 'express';
// import bodyParser from 'body-parser';
import VkBot from 'node-vk-bot-api';

export const app = express();

// app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hi, I\'m a bot. Beep boop...');
});

(function initBot() {
    if (!process.env.TOKEN) {
        return;
    }
    console.log('Beep Boop');
    const bot = new VkBot({
        token: process.env.TOKEN, // vk group token (e.g. 1500af1d528e632f729e706513dc332d87d44e623976a3f56fbe639047d04612eca3de9e6cdd1f8532ec3)
        confirmation: process.env.CONFIRMATION, // vk group Callback API confirmation string (e.g. 5e4103e6)
    });
    
    bot.on(async (ctx) => {
        const { id, from_id: userId } = ctx.message;
        
        const userData = await bot.execute('users.get', {
            user_ids: userId,
        });
        
        try {
            ctx.reply({
                user_id: userId, // user you replying to
                message: `Well said, ${userData[0].first_name}!`,
                random_id: Date.now(),
                peer_id: 2000000000 + process.env.GROUP,
                reply_to: id, // message you replying to (optional)
            });
        } catch (err) {
            console.error(err);
        }
    });
    
    app.post('/', bot.webhookCallback);
})();

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`The app is listening on port ${port}!`);
});
