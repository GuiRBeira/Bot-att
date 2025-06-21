function Pescaria() {
    const chance = Math.floor(Math.random() * 100);

    if (chance < 15) {
        return "🥾 Você pescou uma *bota velha*!\nEla está molhada, fedida e... cheia de lama.\n🪣 Nada acontece.";
    } else if (chance < 40) {
        return "🐟 Você fisgou um *peixe comum*!\nO cheiro de peixe assado já bateu na vila.\n+10🧧 pontos!";
    } else if (chance < 45) {
        return "🍢 Um *espetinho de carne* boiou até sua vara!\nVocê não hesita: come na hora e se sente revigorado.\n+1❤️ de vida!";
    } else if (chance < 55) {
        return "🌀 Você caiu em um *Genjutsu*!\nAchou que tinha pescado um biju... mas era tudo miragem.\n😵 Você fica atordoado e *perde a próxima rodada*!";
    } else if (chance < 65) {
        return "🐸 Um *sapo ninja de AmeGakure* pulou na sua linha!\nCom um golpe rápido, ele rouba o último peixe que você tinha pescado!\n💨 Último peixe perdido!";
    } else if (chance < 75) {
        return "💥 Um selo explodiu! Era um *Kibaku Fuda* preso à isca!\nVocê é arremessado alguns metros pra trás.\n-1💔 de vida!";
    } else if (chance < 80) {
        return "🥷 Sua vara enroscou na vara do seu colega ninja...\nAproveitando a confusão, você *rouba o último peixe pescado* por ele!\n🎯 Esperteza também é uma habilidade ninja!";
    } else if (chance < 85) {
        return "🌊 Um tentáculo gigantesco irrompe da água — *Gyūki está furioso*!\nEle lança uma Bijudama na sua direção.\n🔥 -2💔 de vida!";
    } else if (chance < 92) {
        return "💰 Você pescou um *baú de tesouro* misterioso!\nDentro dele há um pergaminho antigo envolto em seda.\n✨+50🧧 pontos!";
    } else if (chance < 98) {
        return "🐡 Você fisgou um *peixe raro*, com escamas brilhando chakra!\nOs anciãos diriam que ele traz sorte.\n💎+25🧧 pontos!";
    } else {
        return "🐙 Um redemoinho surge na água... e dela emerge a *Oito Caudas (Gyūki)* disfarçada de peixe!\nSeu chakra é tão intenso que paralisa todos à sua volta.\nCom sorte, você escapa com um fragmento dela.\n🏆 +100🧧 pontos!";
    }
}

module.exports = { Pescaria };
