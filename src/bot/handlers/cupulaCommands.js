const Gabarito = require('../../games/batalhanaval');
const gerarResultadoEvento = require('../../info/resultado').gerarResultadoEvento;

const cupulaCommands = {
    '!gabarito': async (sock, msg) => {
        const response = Gabarito();
        await sock.sendMessage(msg.key.remoteJid, { text: response });
    },
    '!resultado': async (sock, msg, text) => {
        try {
            const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

            if (lines.length < 5) throw new Error("Formato inválido! Veja o modelo de exemplo.");

            // Header
            const [nomeEvento, emojiEvento1, emojiEvento2] = lines[0].split('|').map(s => s.trim());

            // Responsável
            const [titulo, patente, cla, ...nomeParts] = lines[1].split('|').map(s => s.trim());
            const nomeResponsavel = nomeParts.join('|');

            const responsavel = { titulo, patente, cla, nome: nomeResponsavel };

            // Vencedores
            const vencedores = lines.slice(2).map(l => {
                const [patente, cla, ...rest] = l.split('|').map(s => s.trim());
                const nome = rest.slice(0, rest.length - 3).join('|');
                const emoji1 = rest[rest.length - 3];
                const emoji2 = rest[rest.length - 2];
                const premiacao = rest[rest.length - 1];
                return { patente, cla, nome, emoji1, emoji2, premiacao };
            });

            const response = gerarResultadoEvento({ nomeEvento, emojiEvento1, emojiEvento2, responsavel, vencedores });
            await sock.sendMessage(msg.key.remoteJid, { text: response });
        } catch (err) {
            await sock.sendMessage(msg.key.remoteJid, { text: `❌ Erro ao processar resultado: ${err.message}` });
        }
    }
}

async function processCupulaMessages(sock, msg, text) {
    const [cmd, ...rest] = text.split('\n'); // cmd = primeira linha, rest = linhas seguintes
    const commandFn = cupulaCommands[cmd.trim()];

    if (commandFn) {
        await commandFn(sock, msg, rest.join('\n')); // passa as linhas restantes para o handler
    }
}

module.exports = { processCupulaMessages };
