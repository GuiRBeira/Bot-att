function gerarResultadoEvento({
    nomeEvento,
    emojiEvento1,
    emojiEvento2,
    responsavel,
    vencedores // array de 3 objetos com: {patente, cla, nome, emoji1, emoji2, premiacao}
}) {
    const [v1, v2, v3] = vencedores;
    const today = new Date();
    return `*•➖➿ ❪☔ ⟮ ✰ ✨ ✰ ⟯ ☔❫ ➿➖•*
    *🌧❰-🈳 “ AɷεGɑƙυɾε ”🈳-❱🌧*

*${emojiEvento1}⟦${emojiEvento2} • ${nomeEvento} • ${emojiEvento2}⟧${emojiEvento1}*
    ❪ •🏆❝ Resultado ❞🏆• ❫

*•➖➿ ❪☔ ⟮ ✰ ✨ ✰ ⟯ ☔❫ ➿➖•* 

*✨⟮🥇 ꕊ Primeiro Lugar ꕊ 🥇⟯✨*
*১${v1.patente}'${v1.cla} ${v1.nome} ${v1.cla}'${v1.patente}১*
*${v1.emoji1}'${v1.emoji2} ❰ ${v1.premiacao} ❱ ${v1.emoji2}'${v1.emoji1}*

*•➖➿ ❪☔ ⟮ ✰ ✨ ✰ ⟯ ☔❫ ➿➖•*

*✨⟮🥈 ꕊ Segundo Lugar ꕊ 🥈⟯✨*
*১${v2.patente}'${v2.cla} ${v2.nome} ${v2.cla}'${v2.patente}১*
*${v2.emoji1}'${v2.emoji2} ❰ ${v2.premiacao} ❱'${v2.emoji2}'${v2.emoji1}* 

*•➖➿ ❪☔ ⟮ ✰ ✨ ✰ ⟯ ☔❫ ➿➖•*

*✨⟮🥉 ꕊ Terceiro Lugar ꕊ 🥉⟯ ✨*
*১${v3.patente}'${v3.cla} ${v3.nome} ${v3.cla}'${v3.patente}১*
*${v3.emoji1}'${v3.emoji2} ❰ ${v3.premiacao} ❱'${v3.emoji2}'${v3.emoji1}*

*•➖➿ ❪☔ ⟮ ✰ ✨ ✰ ⟯ ☔❫ ➿➖•*

જ🌹 (( 💞✨ "O esforço de vc  hoje é a conquista de amanhã. Nunca desistam dos seus objetivos! Aos ganhadores, por favor, entrem em contato no privado para receberem seus prêmios." ✨💞 )) 🌹જ

        *📆 ${today.toLocaleDateString('pt-BR')} 📅* 
*•➖➿ ❪☔ ⟮ ✰ ✨ ✰ ⟯ ☔❫ ➿➖•*
_• ครร : ✍🏻_
*☔ಌ❰🈳❛ ${responsavel.titulo} ❜🈳❱ಌ☔*
*❦${responsavel.patente}❪${responsavel.cla}“ ${responsavel.nome} ”${responsavel.cla}❫${responsavel.patente}❦*`;
}

module.exports = { 
    gerarResultadoEvento 
};