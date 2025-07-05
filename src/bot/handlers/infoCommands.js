function getArenaMessage() {
    return `
*🏛️ Coliseu dos Tolos — A Arena dos Destemidos... ou Despreparados*

🎭 Entre por sua conta e risco abaixo.

⚠️ Se o link aparecer preto/inativo, apenas envie qualquer mensagem para atualizar.

⚔️ Ao fim do combate, lembre-se de deixar a arena — ou ficará preso no ciclo da vergonha eterna.

*Que os tolos sejam valentes... ou os valentes se tornem tolos.* 💥
`;
}

function getRegras(){
    return `❝⏤͟͟͞͞ ᖇᕮᘜᖇᗩՏ ᗪO ᑕOᒪIՏᕮᑌ ᗪOՏ TOᒪOՏ:

1️⃣ Todas as lutas ocorrerão no formato *Gennin* (🈂️).

2️⃣ Cada jogador terá *5 minutos* para realizar sua jogada. Passado esse tempo, será considerado ausente.

3️⃣ *Mensagens editadas, prints manipulados ou alterações visuais nas jogadas resultarão em desclassificação imediata.*

⚠️ Envie sua jogada diretamente no meu PV, escolhendo uma das opções abaixo:

✊ Pedra  
📰 Papel  
✌️ Tesoura  

_"O Coliseu dos Tolos não perdoa vacilos."_  `
}

const arenaLink = "https://chat.whatsapp.com/DF3UDRZSSqqG30bcJXUXI6";

const commands = {
    "!arena": () => [getArenaMessage(), arenaLink],
}

async function processInfoCommands(sock, msg, text) {
    const [command] = text.trim().split(' ');
    const func = commands[command.toLowerCase()];

    if (!func) return;

    try {
        const [message, link] = func();

        await sock.sendMessage(msg.key.remoteJid, { text: message });

        // Envia o link sozinho para garantir preview com imagem do grupo
        await sock.sendMessage(msg.key.remoteJid, { text: link });
    } catch (err) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `❌ Erro ao executar comando: ${err.message}`
        });
    }
}
