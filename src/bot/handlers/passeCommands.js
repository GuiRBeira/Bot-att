const { Pescaria } = require('../../passe/pescaria.js');

const passeCommands = {
    '!pesca': async (sock, msg, quantidade = '1') => {
        const vezes = Math.min(parseInt(quantidade), 500); // Limite de até 500 pescas
        const resultados = {};
        let mensagens = [];

        for (let i = 0; i < vezes; i++) {
            const result = Pescaria();
            mensagens.push(result);

            const linha = result.split('\n')[0]; // primeira linha serve como identificador
            resultados[linha] = (resultados[linha] || 0) + 1;
        }

        if (vezes === 1) {
            await sock.sendMessage(msg.key.remoteJid, { text: mensagens[0] });
        } else {
            let relatorio = `📊 *Relatório de ${vezes} pescas*\n\n`;
            for (const [item, count] of Object.entries(resultados)) {
                relatorio += `• ${item} — ${count}x\n`;
            }
            await sock.sendMessage(msg.key.remoteJid, { text: relatorio });
        }
    }
};

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

module.exports = { processPasseMessages };
