const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions, homeOptions, infoOptions, supportOptions, homeKeyboardOptions, shopKeayboardOptions, profileKeayboardOptions,
    womenKeyboardOptions, shoesWomenKeyboardOptions, topWomenKeyboardOptions} = require('./options')
const sequelize = require('./db');
const UserModel = require('./models');

const token = '6273235794:AAH-G6xzuLLn0pAUmZgE6YnYSt0vIa5yrvM'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const sendIdAdmin = 394138933
const sendIdGroup = -929786460

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

    //await bot.sendMessage(sendIdGroup, 'ChatID: ' + chatId + '.\nText: ' + text)
    await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/c1b/025/c1b025fd-1a3a-4e66-8f04-94f42538faf9/96/7.webp', homeKeyboardOptions)
    return bot.sendMessage(chatId, 'Welcome to vdcast telegram bot. Nice to meet you! :) Please, pick from the following options and use my powerful skills! ^_^', homeOptions);
    //return bot.sendMessage(chatId, '/game - Play game and check your luck today! :)\n/info - Get more info.');

}

const startHomeBack = async (chatId, text) => {
    await bot.sendSticker(chatId, 'https://i.ibb.co/yP6Fd5f/vdcast-logo-webp.webp', homeKeyboardOptions)
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
    return bot.sendMessage(chatId, 'Send your message here and I`ll answer you ASAP ;)', supportOptions);
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
            if (chatId == sendIdAdmin){
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

    bot.onText(/Shop/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'Shop Inline Buttons\nChoose Gender Buttons', shopKeayboardOptions);
    });

    bot.onText(/Profile/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'Profile Inline Buttons', profileKeayboardOptions);
    });

    bot.onText(/Back Home/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'BackToHome Inline Buttons', homeKeyboardOptions);
    });

    bot.onText(/Women/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'Women Inline Buttons\nChoose Category Buttons', womenKeyboardOptions);
    });

    bot.onText(/Shoes W/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'Shoes Women Inline Buttons\nChoose Size Buttons', shoesWomenKeyboardOptions);
    });

    bot.onText(/All sizes W Shoes/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'All sizes W Shoes Inline Buttons\nShow Products Page 1 Buttons');
    });

    bot.onText(/30-34 W Shoes/, async (msg) => {
        const chatId = msg.chat.id;

        await bot.sendSticker(chatId, 'https://i.ibb.co/yP6Fd5f/vdcast-logo-webp.webp', homeKeyboardOptions)
        return bot.sendMessage(chatId, '30-34 W Shoes Inline Buttons\nShow Products Page 1 Buttons');
    });

    bot.onText(/34-38 W Shoes/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, '34-38 W Shoes Inline Buttons\nShow Products Page 1 Buttons');
    });

    bot.onText(/38-42 W Shoes/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, '38-42 W Shoes Inline Buttons\nShow Products Page 1 Buttons');
    });

    bot.onText(/Top W/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'Top W Inline Buttons\nChoose Size Buttons', topWomenKeyboardOptions);
    });

    bot.onText(/All sizes W Top/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'All sizes W Top Inline Buttons\nChoose Size Buttons');
    });

    bot.onText(/XSx W Top/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'XSx W Top Inline Buttons\nChoose Size Buttons');
    });

    bot.onText(/S W Top/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'S W Top Inline Buttons\nChoose Size Buttons');
    });

    bot.onText(/M W Top/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'M W Top Inline Buttons\nChoose Size Buttons');
    });

    bot.onText(/L W Top/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'L W Top Inline Buttons\nChoose Size Buttons');
    });

    bot.onText(/XLx W Top/, async (msg) => {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'XLx W Top Inline Buttons\nChoose Size Buttons');
    });
    

    
    ['', ''],
    ['', ''],
    ['', ''],

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            await bot.sendMessage(sendIdGroup, 'ChatID: ' + chatId + '\nText: ' + text)
            if (text === '/start') {
                return startHome(chatId, text);
            }
            if (text === '/info') {
                return startInfo(chatId, msg);
            }
            if (text === '/game') {
                return startGame(chatId);
            }


            
            console.log(msg)
            //return bot.sendMessage(sendIdGroup, 'ChatID: ' + chatId + '. Text of message: ' + text)
			//return bot.sendMessage(sendIdAdmin, 'ChatID: ' + chatId + '. Text of message: ' + text)
            //return bot.sendMessage(chatId, 'Got it! Let me answer you in a while...', supportOptions);
        } catch (e) {
            await bot.sendMessage(sendIdGroup, 'ChatID: ' + chatId + '. Text of message: ' + text)
            return bot.sendMessage(chatId, 'Some error, checkit!) ' + e);
        }

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        bot.sendMessage(sendIdGroup, chatId + ' | Chose inline: ' + data)
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