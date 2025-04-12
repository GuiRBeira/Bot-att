const {
    updateAmePlayersByMissionResult,
    getAmePontos,
    addPlayer,
    updatePlayerPoints,
    updatePlayerRank,
    updatePlayerClan,
    deletePlayer,
    getAll
} = require('../../services/index');

const commands = {
    '!add': addPlayer,
    '!del': deletePlayer,
    '!att': updateAmePlayersByMissionResult,
    '!upp': updatePlayerPoints,
    '!upr': updatePlayerRank,
    '!upc': updatePlayerClan,
    '!all': getAll,
};

async function processServiceMessages(sock, msg, text) {
    const [command, ...args] = text.trim().split(' ');
    const sender = msg.key.remoteJid;

    if (!commands[command]) {
        await sock.sendMessage(sender, { text: '❌ Comando não reconhecido.' });
        return;
    }

    let response = '❌ Argumentos inválidos ou insuficientes.';
    try {
        switch (command) {
            case '!add': {
                // !add Clã Nome 🈂 50
                const [clan, ...rest] = args;
                const points = parseInt(rest.pop());
                const rank = rest.pop();
                const name = rest.join(' ');
                if (clan && name && rank && !isNaN(points)) {
                    response = addPlayer(clan, { name, rank, points });
                }
                break;
            }

            case '!upp': {
                // !upp Nome 🈂 Clã 100
                const [name, rank, clan, points] = args;
                if (name && rank && clan && points) {
                    response = updatePlayerPoints(clan, name, rank, parseInt(points));
                }
                break;
            }

            case '!upr': {
                // !upr Clã Nome 🈂 ✳
                const [clan, ...rest] = args;
                const newRank = rest.pop();
                const currentRank = rest.pop();
                const name = rest.join(' ');
                if (clan && name && currentRank && newRank) {
                    response = updatePlayerRank(clan, name, currentRank, newRank);
                }
                break;
            }

            case '!upc': {
                // !upc ClãAntigo Nome 🈂 ClãNovo
                const [oldClan, ...rest] = args;
                const newClan = rest.pop();
                const rank = rest.pop();
                const name = rest.join(' ');
                if (oldClan && name && rank && newClan) {
                    response = updatePlayerClan(oldClan, name, rank, newClan);
                }
                break;
            }

            case '!del': {
                // !delete Nome
                const name = args.join(' ');
                if (name) {
                    response = deletePlayer(name);
                }
                break;
            }

            case '!all': {
                const data = commands[command]();
                response = JSON.stringify(data, null, 2).slice(0, 4096); // WhatsApp limita tamanho
                break;
            }

            default:
                response = '⚠️ Comando em construção ou não suportado via texto.';
                break;
        }
    } catch (err) {
        console.error(err);
        response = '❌ Erro ao processar comando.';
    }

    await sock.sendMessage(sender, { text: response || '✅ Operação realizada com sucesso!' });
}
