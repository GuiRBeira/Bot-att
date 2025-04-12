// Coliseu
const { processarAposta } = require('../../coliseu/apostas');
const { rulesApostas, limApostas } = require('../../coliseu/info-apostas');
const { escolherArenaAleatoria, sortearPatente, sortearElemento } = require('../../coliseu/sorteios');

const patentesValidas = ["Gennin", "Chunnin", "Jounnin", "Anbu", "Sannin", "Daimyo", "Kage", "Rikkudo"];

const commands = {
    '!arena': {
        execute: () => escolherArenaAleatoria(),
    },
    '!elemento': {
        execute: () => sortearElemento(),
    },
    '!patente': {
        execute: (args) => {
            if (!args || !patentesValidas.includes(args)) {
                throw new Error('Uso incorreto!\nExemplo: !patente Gennin\nOpções: ' + patentesValidas.join(', '));
            }
            const result = sortearPatente(args);
            return `Patente sorteada: ${result.nome}`;
        }
    }
}

async function processColiseuMessages(sock, msg, text) {
    const [cmd, ...args] = text.split(' ');
    const command = commands[cmd];

    if (!command) return; // comando não existe

    try {
        const response = await command.execute(args.join(' ').trim());
        await sock.sendMessage(msg.key.remoteJid, { text: response });
    } catch (error) {
        await sock.sendMessage(msg.key.remoteJid, { text: `❌ ${error.message}` });
    }
}

module.exports = { processColiseuMessages };