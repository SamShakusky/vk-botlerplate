import VkBot from 'node-vk-bot-api';
import { app } from './index.js';

export function initBot() {
    if (!process.env.TOKEN) {
        return;
    }
    
    const bot = new VkBot({
        token: process.env.TOKEN, // vk group token (e.g. 1500af1d528e632f729e706513dc332d87d44e623976a3f56fbe639047d04612eca3de9e6cdd1f8532ec3)
        confirmation: process.env.CONFIRMATION, // vk group Callback API confirmation string (e.g. 5e4103e6)
    });
    
    bot.on(async (ctx) => {
        const { from_id: userId } = ctx.message;
        
        const userData = await bot.execute('users.get', {
            user_ids: userId,
        });
        
        try {
            ctx.reply({
                user_id: userId, // user you replying to
                message: `Well said, ${userData[0].first_name}!`,
                random_id: Date.now(),
            });
        } catch (err) {
            console.error(err);
        }
    });
    
    app.post('/', bot.webhookCallback);
    
    console.log('🤖 I\'m alive! Beep Boop');
};
