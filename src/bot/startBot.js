// Core / Libs
const { DisconnectReason, makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

// Group-IDS
const { groupIds, vila, coliseu } = require('../config/group-ids');

// Funções de processamento de mensagens
const { processVilaMessages } = require('./handlers/vilaCommands')
const { processGameMessages , processSlotMachine, processRoulette } = require('./handlers/gameCommands')
const { processCombo } = require('./handlers/comboCommands')
const { processColiseuMessages } = require('./handlers/coliseuCommands')
// aqui segue a vida normalmente

function startBot() {
    
    async function processApostaMessages(sock, msg, text) {
        if (text.startsWith('💫(•🏟\'❰ Coliseu Estelar ❱\'🏟•)💫\n 📝❪•💸❝ Ficha de Aposta ❞💸•❫📝\n\n•➖➖❰✨ ⟦• ✰ ❲🏟❳ ✰ •⟧ ✨❱➖➖•\n\n')) {
            console.log('ENTROU NA LINHA 137');
            const response = processarAposta(text); // Processa a ficha de aposta
            await sock.sendMessage(msg.key.remoteJid, { text: response }); // Envia a resposta
        } else if (text.startsWith('/apostas')) {
            await sock.sendMessage(msg.key.remoteJid, { text: rulesApostas() }); // Envia a resposta
            await sock.sendMessage(msg.key.remoteJid, { text: limApostas() }); // Envia a resposta
        }
    }
    
    // Função principal de processamento de mensagens
    async function processMessage(sock, msg) {
        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
        const playerJid = msg.key.participant;
        const remoteJid = msg.key.remoteJid;
    
        if (remoteJid.endsWith('@s.whatsapp.net')) {
            // A mensagem é de uma conversa privada
            await processCombo(sock, msg, text);
        }
        if (remoteJid === vila) {
            await processVilaMessages(sock, msg, text);
        }
        if (groupIds.includes(remoteJid)) {
            await processGameMessages(sock, msg, text, playerJid);
            if (text.startsWith('!slot')) {
                await processSlotMachine(sock, msg, text);
            }
            if (text.startsWith('!roleta')) {
                await processRoulette(sock, msg, text);
            }
        } 
        if (coliseu.includes(remoteJid)) {
            await processColiseuMessages(sock, msg, text);
        }
        if (text.startsWith('!m')) {
            console.log('Mensagem recebida:', JSON.stringify(msg, null, 2));
        }
    }
    
    // Conexão ao WhatsApp
    async function connectToWhatsApp() {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
        const sock = makeWASocket({
            printQRInTerminal: true,
            auth: state
        });
    
        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
                if (shouldReconnect) {
                    connectToWhatsApp();
                }
            } else if (connection === 'open') {
                console.log('opened connection');
            }
        });
    
        sock.ev.on('creds.update', saveCreds);
    
        sock.ev.on('messages.upsert', async (m) => {
            const msg = m.messages[0];

            // Filtro: ignora mensagens de sistema, bots ou tipos desconhecidos
            if (!msg.message || msg.message.protocolMessage) {
                return;
            }
        
            try {
                await processMessage(sock, msg);
            } catch (err) {
                console.error('Erro ao processar mensagem:', err);
            }
        });
    }
    // Executa a função principal
    connectToWhatsApp();
}

module.exports = startBot;