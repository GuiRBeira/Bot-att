function getFicha(name = "nome", emoji1 = "cla", emoji2 = "ptt") {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR');

    const cleanName = removeEmojis(name);

    return `➖➖➖➖➖➖➖➖➖➖➖
*💫🕉'RPG De Naruto Online'🕉💫*

*💢 Ficha 💢*

*👉🏻 Nome/Nick:* 
*👉🏻 Clã:* 
*👉🏻 Recrutado por:* 

*⟦${emoji2}${emoji1} ❰ ${cleanName}❱ ${emoji1}${emoji2}⟧*

   *📆 Data: ${formattedDate} 📅*
➖➖➖➖➖➖➖➖➖➖➖`
}

function removeEmojis(text) {
    return text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim();
}


module.exports = {
    getFicha
};
