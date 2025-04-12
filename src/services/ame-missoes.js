const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'ame-pontos.json');
const { getAll, updatePlayer, addPlayer } = require('./ame-services');

function updateAmePlayersByMissionResult(missionResult) {
    const ameData = getAll(); 
    const linhas = missionResult.split('\n').map(l => l.trim()).filter(l => l);

    const ranksValidos = ['🈂', '✳', '✴', '💠', '🔘', '🃏', '🀄', '🎴'];
    const clanEmojis = ameData.map(clan => clan.clanEmoji);

    linhas.forEach(linha => {
        const regex = /^(.)(.)(.+?)\s.+\2\1$/;
        const match = linha.match(regex);

        if (!match) return;

        const rank = match[1];
        const clanEmoji = match[2];
        const playerName = match[3].trim();

        if (!ranksValidos.includes(rank)) return;
        if (!clanEmojis.includes(clanEmoji)) return;

        // Encontrar o clan correto
        const clan = ameData.find(clan => clan.clanEmoji === clanEmoji);
        if (!clan) return;

        const playerExists = clan.players.find(p => p.name.toLowerCase() === playerName.toLowerCase());

        if (playerExists) {
            updatePlayer(playerName, clan.clan, 50); // +50 pontos
        } else {
            addPlayer({
                name: playerName,
                rank,
                points: 50
            }, clan.clan);
        }
    });
}

module.exports = {
    updateAmePlayersByMissionResult
};
