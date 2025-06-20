// Games
const { playBlackjack, buyCard, stopGame } = require('../../games/blackjack');
const { playSlotMachine } = require('../../games/slot-machine');
const { playRoulette } = require('../../games/roulette');

// Função para processar mensagens de jogos
async function processGameMessages(sock, msg, text, playerJid) {
    const commands = {
        '!blackjack': () => playBlackjack(playerJid),
        'bj': () => playBlackjack(playerJid),
        '!Bj': () => playBlackjack(playerJid),
        'comprar': () => buyCard(playerJid),
        'c': () => buyCard(playerJid),
        'parar': () => stopGame(playerJid),
        'p': () => stopGame(playerJid)
    };

    const responseFn = commands[text];
    if (responseFn) {
        const response = await responseFn();
        await sock.sendMessage(msg.key.remoteJid, { text: response });
    }
}

 // Função para processar a roleta
async function processRoulette(sock, msg, text) {
    const [_, number, color, prize = 10] = text.split(' ');
    const betAmount = parseInt(prize);

    if (betAmount > 100) {
        await sock.sendMessage(msg.key.remoteJid, { text: 'A aposta máxima permitida é de 100.' });
        return;
    }

    if (!isNaN(parseInt(number)) && (color === 'vermelho' || color === 'preto')) {
        const response = playRoulette(parseInt(number), color, betAmount);
        await sock.sendMessage(msg.key.remoteJid, { text: response });
    } else {
        await sock.sendMessage(msg.key.remoteJid, { text: 'Comando inválido. Exemplo de uso: !roleta 17 vermelho 10' });
    }
}

 // Função para processar o caça-níqueis
async function processSlotMachine(sock, msg, text) {
    const [, prize = 10] = text.split(' ');
    const betAmount = parseInt(prize);

    if (betAmount > 100) {
        await sock.sendMessage(msg.key.remoteJid, { text: 'A aposta máxima permitida é de 100.' });
        return;
    }

    const response = playSlotMachine(betAmount);
    await sock.sendMessage(msg.key.remoteJid, { text: response });
}

 module.exports = { processGameMessages , processSlotMachine, processRoulette };