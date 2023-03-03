const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions, homeOptions, infoOptions, supportOptions, homeKeayboardOptions} = require('./options')
const sequelize = require('./db');
const UserModel = require('./models');

const token = '6273235794:AAH-G6xzuLLn0pAUmZgE6YnYSt0vIa5yrvM'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const sendId = 394138933

const startHome = async (chatId, text) => {


    const [user, created] = await UserModel.findOrCreate({
        where: { chatId: chatId.toString() }
    });
    console.log(user.username);
    console.log(user.job);
    console.log(created);
    if (created) {
        console.log(user.job);
    }

    await bot.sendMessage(sendId, 'ChatID: ' + chatId + '. Text of message: ' + text)
    await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/c1b/025/c1b025fd-1a3a-4e66-8f04-94f42538faf9/96/7.webp', homeKeayboardOptions)
    return bot.sendMessage(chatId, 'Welcome to vdcast telegram bot. Nice to meet you! :) Please, pick from the following options and use my powerful skills! ^_^', homeOptions);
    //return bot.sendMessage(chatId, '/game - Play game and check your luck today! :)\n/info - Get more info.');

}

const startHomeBack = async (chatId, text) => {
    await bot.sendSticker(chatId, 'https://i.ibb.co/yP6Fd5f/vdcast-logo-webp.webp', homeKeayboardOptions)
    return bot.sendMessage(chatId, 'Welcome to vdcast telegram bot. Nice to meet you! :) Please, pick from the following options and use my powerful skills! ^_^', homeOptions);
}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Now I will think of digit (0-9) and you need to guess it. Good luck! :)`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    return bot.sendMessage(chatId, 'Guess the number...', gameOptions);
}

const startInfo = async (chatId, msg) => {
    const user = await UserModel.findOne({ where: { chatId: chatId.toString() } })
    return bot.sendMessage(chatId, `Your name is ${msg.from.first_name}, user name @${msg.from.username}. Correct answers: ${user.right}. Wrong answers: ${user.wrong}`, infoOptions);
}

const startSupport = async (chatId) => {
    return bot.sendMessage(chatId, 'Send your message here and I`ll answer you ASAP ;)', supportOptions)
}


const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()
		console.log('CONNEcting success DB')
    } catch (e) {
        console.log('faiLED connECTION to DB', e)
    }

    bot.setMyCommands([
        {command: '/start', description: 'Restart bot'},
        {command: '/info', description: 'Get information about user'},
        {command: '/game', description: 'Game "Guess The Number"'},
    ])



    bot.onText(/\/sendmsg (.+)/, async (msg, match) => {
      
        const chatId = msg.chat.id;
      

        try {            
            if (chatId == sendId){
                var inputArray = match[1].split(" ");
                var receiverChatId = inputArray[0];
                var textArray = inputArray.slice(1)
                var receiverText = textArray.toString();
                receiverText = receiverText.replaceAll(",,", "KOMA")
                receiverText = receiverText.replaceAll(",", " ")
                receiverText = receiverText.replaceAll("KOMA", ", ")
                //await bot.sendMessage(chatId, "Admin started")
                return bot.sendMessage(receiverChatId, receiverText)
            } else {
                return bot.sendMessage(chatId, "I don't understand this command");
            }
        } catch (e){
            return bot.sendMessage(chatId, 'bot.onText | Some error, checkit!' + e);
        }
    });



    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {
                return startHome(chatId, text);
            }
            if (text === '/info') {
                return startInfo(chatId, msg);
            }
            if (text === '/game') {
                await bot.sendMessage(sendId, 'ChatID: ' + chatId + '. Text of message: ' + text)
                return startGame(chatId);
            }


            console.log(msg)
            await bot.sendMessage(-631688254, 'ChatID: ' + chatId + '. Text of message: ' + text)
			return bot.sendMessage(sendId, 'ChatID: ' + chatId + '. Text of message: ' + text)
            //return bot.sendMessage(chatId, 'Got it! Let me answer you in a while...', supportOptions);
        } catch (e) {
            await bot.sendMessage(sendId, 'ChatID: ' + chatId + '. Text of message: ' + text)
            return bot.sendMessage(chatId, 'Some error, checkit!) ' + e);
        }

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        bot.sendMessage(sendId, chatId + ' | Chose: ' + data)
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === '/info') {
            return startInfo(chatId, msg);
        }
        if (data === '/home') {
            return startHomeBack(chatId, data);
        }
        if (data === '/support') {
            return startSupport(chatId, data);
        }
        const user = await UserModel.findOne({ where: { chatId: chatId.toString() } })
        if (data == chats[chatId]) {
            user.right += 1;
            await bot.sendMessage(chatId, `You've chosen: ${data}, bot made: ${chats[chatId]}`);
            await bot.sendMessage(chatId, `Conratulations! Your are lucky today :)`, againOptions);
        } else {
            user.wrong += 1;
            await bot.sendMessage(chatId, `You've chosen: ${data}, bot made: ${chats[chatId]}`);
            await bot.sendMessage(chatId, `Missed :(`);  
            await bot.sendMessage(chatId, `Play again to try your luck one more time! :)`, againOptions);
        }
        await user.save();
    })
}

start()