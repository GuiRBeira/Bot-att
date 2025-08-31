import { Gabarito } from "../../games/batalhanaval.js";

const cupulaCommands = {
    '!gabarito': async (sock, msg) => {
        const gabarito = Gabarito();
        // Aqui você já envia a resposta
        await sock.sendMessage(msg.key.remoteJid, { text: gabarito });
    }
}

async function processCupulaMessages(sock, msg, text) {
    const commandFn = cupulaCommands[text];
    if (commandFn) {
        // Aqui você chama a função, mas não precisa reenviar a mensagem
        await commandFn(sock, msg);
    }
}

module.exports = { processCupulaMessages };
