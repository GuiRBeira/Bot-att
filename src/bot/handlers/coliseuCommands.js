// Coliseu
const { 
    sortearPatente,
    sortearElemento,
    adicionarArena,
    listarArenasDisponiveis,
    marcarArenaDisponivel,
    sortearArenaDisponivel, 
    resetarArenas,
} = require('../../coliseu/sorteios');

const patentesValidas = [
    "Gennin",
    "Chunnin",
    "Jounnin",
    "Anbu",
    "Sannin",
    "Daimyo",
    "Kage",
    "Rikkudo"
];

const commands = {
    '!arena': {
    execute: async (args) => {
        const action = args[0]; // primeiro argumento é a ação
        const nome = args.slice(1).join(" "); // resto é o nome da arena (se tiver)

        switch (action) {
            case "add":
                if (!nome) throw new Error("⚠️ Informe o nome da arena!");
                return adicionarArena(nome);

            case "list":
                return listarArenasDisponiveis();

            case "toggle":
                if (!nome) throw new Error("⚠️ Informe o nome da arena!");
                return marcarArenaDisponivel(nome);

            case "reset":
                resetarArenas();
                return '♻️ Todas as arenas foram resetadas (marcadas como indisponíveis).'

            case "sorteio":
                return sortearArenaDisponivel();

            default:
                return "⚔️ Comando inválido!\nUse: add, list, toggle, reset, sorteio";
            }
        },
    },
    '!elemento': {
        execute: () => {
            return sortearElemento();
        },
    },
    '!patente': {
        execute: (args) => {
            const patente = args[0];
            if (!patente || !patentesValidas.includes(patente)) {
                throw new Error(
                    'Uso incorreto!\nExemplo: !patente Gennin\nOpções: ' + patentesValidas.join(', ')
                );
            }
            const result = sortearPatente(patente);
            return `🎖️ Patente sorteada: ${result.nome}`;
        }
    }
};

async function processColiseuMessages(sock, msg, text) {
    const [cmd, ...rest] = text.trim().split(/\s+/);
    const command = commands[cmd];
    if (!command) return; // comando não existe
    try {
        let response;
        if (cmd === '!arena' && rest[0] === 'add') {
            // pega tudo após "!arena add"
            const content = text.split(' ').slice(2).join(' ');
            // separa pelo \n
            const [nome, descricao] = content.split('\n').map(s => s.trim());
            if (!nome || !descricao) {
                throw new Error("⚠️ Use o formato correto:\n-----------------------------\n!arena add Nome da Arena\nDescrição da Arena\n-----------------------------");
            }
            response = adicionarArena(nome, descricao);
        } else {
            response = await command.execute(rest);
        }
        await sock.sendMessage(msg.key.remoteJid, { text: response });
    } catch (error) {
        await sock.sendMessage(msg.key.remoteJid, { text: `❌ ${error.message}` });
    }
}

module.exports = { processColiseuMessages };