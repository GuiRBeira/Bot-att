const { getMaxListeners } = require('events');
const fs = require('fs');
const { get } = require('http');
const path = require('path');

function getAmePontos() {
    const filePath = path.join(__dirname, '../info/data', 'ame-pontos.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR');

    let msg = `
*🌧❰-🈳❪ AmeGakure ❫🈳-❱🌧*  
*🌧❰-☔❪ País da Chuva ❫☔-❱🌧*  

*❕⟦🪙⟮ Moeda da Chuva ⟯🪙⟧❕*
`;

    data.forEach(clan => {
        if (clan.players.length > 0) {
            msg += `\n*•➖➿ ❪✨ ⟮ ✰ 💸 ✰ ⟯ ✨❫ ➿➖•*\n`;
            msg += `*ꕊ❗⟦${clan.clanEmoji} ❰ ${clan.clan} ❱ ${clan.clanEmoji}⟧❗ꕊ*\n`;

            clan.players.forEach(player => {
                msg += `*• ➜ ⟮${player.rank}${clan.clanEmoji}⟯ ${player.name} ❪${player.points}❫🪙*\n`;
            });
        }
    });
    msg += `\n*•➖➿ ❪✨ ⟮ ✰ 💸 ✰ ⟯ ✨❫ ➿➖•*\n
    ⟦🈳❰ Total • Pontos ❱🈳⟧  
     🎗❪🪙 ⟮ 38.400 ⟯ 🪙❫🎗  
•➖➿ ❪✨ ⟮ ✰ 💸 ✰ ⟯ ✨❫ ➿➖•  
    
• ➜ 🪙 ❪ Depois que você comprar equipamentos esses pontos serão zerados ❫❕  
• ➜ 🪙 ❪ EX: Tenho 600 Pontos, compro uma Arma Ninja que custa 600. Meu saldo é zero ❫❕  
    
✨❰📆⟦ Última Atualização ⟧📆❱✨  
• 🥻❴ ${formattedDate} ❵🥻 •`;
    console.log(msg);
    return msg;
}

getAmePontos();

module.exports = { getAmePontos };
