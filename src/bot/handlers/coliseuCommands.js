// Coliseu
const { 
    sortearPatente,
    sortearElemento,
    adicionarArena,
    listarArenasDisponiveis,
    marcarArenaDisponivel,
    sortearArenaDisponivel, 
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
                return resetarArenas();

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
    const [cmd, ...args] = text.trim().split(/\s+/); 
    const command = commands[cmd];

    if (!command) return; // comando não existe

    try {
        const response = await command.execute(args);
        await sock.sendMessage(msg.key.remoteJid, { text: response });
    } catch (error) {
        await sock.sendMessage(msg.key.remoteJid, { text: `❌ ${error.message}` });
    }
}

module.exports = { processColiseuMessages };