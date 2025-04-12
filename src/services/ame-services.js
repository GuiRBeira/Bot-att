const { readData, saveData } = require('../utils/FileHandler');

module.exports = {
  addPlayer: (clanEmoji, playerName, rank) => {
    const data = readData();
    const clan = data.find(c => c.clanEmoji === clanEmoji);
    if (!clan) return 'Clã não encontrado.';
  
    const novoPlayer = {
      name: playerName,
      rank,
      points: 0
    };
  
    clan.players.push(novoPlayer);
    saveData(data);
    return `Player ${playerName} (${rank}) adicionado ao clã ${clan.clanEmoji}.`;
  },

  updatePlayerPoints: (clanName, playerName, rank, newPoints) => {
    const data = readData();
    const clan = data.find(c => c.clan.toLowerCase() === clanName.toLowerCase());
    if (!clan) return `Clã "${clanName}" não encontrado.`;
  
    const player = clan.players.find(p =>
      p.name.toLowerCase() === playerName.toLowerCase() &&
      p.rank === rank
    );
  
    if (!player) return `Player "${playerName}" com rank "${rank}" não encontrado no clã "${clanName}".`;
  
    player.points = newPoints;
    saveData(data);
    return `Pontos do player ${player.name} (${rank}) no clã ${clan.clan} atualizados para ${newPoints}.`;
  },

  updatePlayerRank: (clanName, playerName, currentRank, newRank) => {
    const data = readData();
    const clan = data.find(c => c.clan.toLowerCase() === clanName.toLowerCase());
    if (!clan) return `Clã "${clanName}" não encontrado.`;
  
    const player = clan.players.find(p =>
      p.name.toLowerCase() === playerName.toLowerCase() &&
      p.rank === currentRank
    );
  
    if (!player) return `Player "${playerName}" com rank "${currentRank}" não encontrado no clã "${clanName}".`;
  
    player.rank = newRank;
    saveData(data);
    return `Rank do player ${player.name} atualizado de ${currentRank} para ${newRank}.`;
  },  

  updatePlayerClan: (currentClanName, playerName, rank, newClanName) => {
    const data = readData();
  
    const currentClan = data.find(c => c.clan.toLowerCase() === currentClanName.toLowerCase());
    const newClan = data.find(c => c.clan.toLowerCase() === newClanName.toLowerCase());
  
    if (!currentClan) return `Clã de origem "${currentClanName}" não encontrado.`;
    if (!newClan) return `Novo clã "${newClanName}" não encontrado.`;
  
    const playerIndex = currentClan.players.findIndex(p =>
      p.name.toLowerCase() === playerName.toLowerCase() &&
      p.rank === rank
    );
  
    if (playerIndex === -1) return `Player "${playerName}" com rank "${rank}" não encontrado no clã "${currentClanName}".`;
  
    const [player] = currentClan.players.splice(playerIndex, 1);
    newClan.players.push(player);
    saveData(data);
  
    return `Player ${player.name} (${rank}) movido do clã ${currentClanName} para o clã ${newClanName}.`;
  },
  
  deletePlayer: (clanName, playerName, rank) => {
    const data = readData();
    const clan = data.find(c => c.clan.toLowerCase() === clanName.toLowerCase());
    if (!clan) return 'Clã não encontrado.';
  
    const playerIndex = clan.players.findIndex(p =>
      p.name.toLowerCase() === playerName.toLowerCase() &&
      p.rank === rank
    );
  
    if (playerIndex === -1) return 'Player com esse nome e rank não encontrado no clã.';
  
    const removedPlayer = clan.players.splice(playerIndex, 1)[0];
    saveData(data);
    return `Player ${removedPlayer.name} (${removedPlayer.rank}) removido do clã ${clan.clan}.`;
  },

  getAll: () => readData(),
};
