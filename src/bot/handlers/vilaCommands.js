// Infos
const { 
    getKatana, 
    getContract, 
    getPShop, 
    getPVile, 
    getCronogram, 
    getShopVile, 
    getShopRPG, 
    getMenuVila, 
    getFichaCompraAme, 
    getFichaCompraRPG,
    getFicha
} = require('../../info/index');

const commands = {
    '!katana': getKatana,
    '!contrato': getContract,
    '!pontosloja': getPShop,
    '!cronograma': getCronogram,
    '!pontosame': getPVile,
    '!lojaame': getShopVile,
    '!lojarpg': getShopRPG,
    '!menu': getMenuVila,
    '!compraame': getFichaCompraAme,
    '!comprarpg': getFichaCompraRPG,
};

async function processVilaMessages(sock, msg, text) {
    if (text.startsWith('!ficha')) {
        const textWithoutCommand = text.slice(7).trim();
    
        // Regex que pega os dois últimos emojis
        const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
        const emojis = [...textWithoutCommand.matchAll(emojiRegex)].map(e => e[0]);
    
        const rankEmoji = emojis[emojis.length - 1];
        const clanEmoji = emojis[emojis.length - 2];
    
        const name = textWithoutCommand.replace(emojiRegex, '').trim();
    
        const response = getFicha(name, clanEmoji, rankEmoji);
        await sock.sendMessage(msg.key.remoteJid, { text: response });
    }
       
    const responseFn = commands[text];
    if (responseFn) {
        const response = responseFn();
        await sock.sendMessage(msg.key.remoteJid, { text: response });
    }
}

module.exports = { processVilaMessages };