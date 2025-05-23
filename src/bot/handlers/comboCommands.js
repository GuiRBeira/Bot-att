// Combos
const { placaInicial, placaCombo, placaFinal, getKunais } = require('../../combo/combochu');
const { placaJInicial, placaJFinal } = require('../../combo/combojou');

const comboCommands = {
    '/pi': placaInicial,
    '/pc': placaCombo,
    '/pf': placaFinal,
    '/kunais': getKunais,
    '/pji': placaJInicial,
    '/pjf': placaJFinal,
};

async function processCombo(sock, msg, text) {
    const [cmd, nome, cla, rank, gasto = 0] = text.split(' ');

    if (cmd === 'Boa' && (text.toLowerCase().startsWith('boa luta'))) {
        if (msg.key.fromMe) return;
        await sock.sendMessage(msg.key.remoteJid, { text: 'Boa luta' });
        return;
    }

    const commandFn = comboCommands[cmd];
    if (commandFn) {
        const response = commandFn(nome, cla, rank, gasto);
        await sock.sendMessage(msg.key.remoteJid, { text: response });
    }
    
    if (!commandFn) return;
}

module.exports = { processCombo };
