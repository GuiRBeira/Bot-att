// Core / Libs
const { DisconnectReason, makeWASocket, useMultiFileAuthState } = require('baileys');
const qrcode = require('qrcode-terminal'); // NOVO

// Group-IDS
const { groupIds, vila, coliseu, passe } = require('../config/group-ids');

// Funções de processamento de mensagens
const { processVilaMessages } = require('./handlers/vilaCommands')
const { processGameMessages, processSlotMachine, processRoulette } = require('./handlers/gameCommands')
const { processCombo } = require('./handlers/comboCommands')
const { processColiseuMessages } = require('./handlers/coliseuCommands')
const { processPasseMessages } = require('./handlers/passeCommands');

function startBot() {
    async function processMessage(sock, msg) {
        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
        const playerJid = msg.key.participant;
        const remoteJid = msg.key.remoteJid;

        if (remoteJid.endsWith('@s.whatsapp.net')) {
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
        if (passe.includes(remoteJid)) {
            await processPasseMessages(sock, msg, text);
        }
        if (text.startsWith('!m')) {
            console.log('Mensagem recebida:', JSON.stringify(msg, null, 2));
        }
    }

    async function connectToWhatsApp() {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
        const sock = makeWASocket({
            auth: state
            // printQRInTerminal removido
        });

        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                console.log('🔑 Escaneie o QR abaixo para conectar:');
                qrcode.generate(qr, { small: true }); // exibe o QR manualmente
            }

            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('🔌 Conexão encerrada. Reconectar?', shouldReconnect);
                if (shouldReconnect) {
                    connectToWhatsApp();
                }
            } else if (connection === 'open') {
                console.log('✅ Conectado com sucesso!');
            }
        });

        sock.ev.on('creds.update', saveCreds);

        sock.ev.on('messages.upsert', async (m) => {
            const msg = m.messages[0];
            if (!msg.message || msg.message.protocolMessage) return;

            const msgTimestamp = msg.messageTimestamp;
            const now = Math.floor(Date.now() / 1000);
            if (now - msgTimestamp > 30) return;

            try {
                await processMessage(sock, msg);
            } catch (err) {
                console.error('Erro ao processar mensagem:', err);
            }
        });
    }

    connectToWhatsApp();
}

module.exports = startBot;
