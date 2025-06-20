const { Pescaria } = require('../../passe/pescaria.js');

const passeCommands = {
    '!pesca': async (sock, msg) => {
        const result = Pescaria();
        await sock.sendMessage(msg.key.remoteJid, { text: result });
    }
}

async function processPasseMessages(sock, msg, text) {
    const [cmd, ...args] = text.split(' ');
    const command = passeCommands[cmd.toLowerCase()];

    if (!command) return; // comando não existe

    try {
        await command(sock, msg, ...args);
    } catch (error) {
        await sock.sendMessage(msg.key.remoteJid, { text: `❌ ${error.message}` });
    }
}

module.exports = { processPasseMessages }