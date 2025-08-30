function Pescaria() {
    const chance = Math.floor(Math.random() * 100);

    if (chance < 15) {
        return "🐟 Você fisgou um *peixe comum*!\nO cheiro de peixe assado já bateu na vila.\n+5🏅 pontos!";
    } else if (chance < 18) {
        return "🍢 Um *espetinho de carne* boiou até sua vara!\nVocê come sem pensar duas vezes.\n+1❤️ de vida!";
    } else if (chance < 35) {
        return "🧨 Você encontrou uma *Bomba Ninja* submersa!\nVocê poderá escolher um jogador para receber -1💔 de dano.\n🎯 Use com sabedoria (ou não).";
    } else if (chance < 40) {
        return "🐸 Um *sapo ninja de AmeGakure* pulou na sua linha!\nCom um golpe rápido, ele rouba o último peixe que você tinha pescado!\n💨 Último peixe perdido!";
    } else if (chance < 60) {
        return "💥 Um selo explosivo estava preso à isca!\nA explosão te atinge em cheio.\n-1💔 de vida!";
    } else if (chance < 70) {
        return "🥷 Sua vara enroscou na vara do seu colega ninja...\nVocê aproveita para *roubar o último peixe pescado* por ele!\n🎯 Esperteza também é uma habilidade ninja.";
    } else if (chance < 85) {
        return "🌊 Um tentáculo gigantesco irrompe da água — *Gyūki está furioso*!\nEle lança uma Bijudama na sua direção.\n🔥 -3💔 de vida!";
    } else if (chance < 93) {
        return "🐡 Você fisgou um *peixe raro*, com escamas brilhando chakra!\nOs anciãos diriam que ele traz sorte.\n💎 +10🏅 pontos!";
    } else {
        return "🐙 Um redemoinho surge na água... e dela emerge a *Oito Caudas (Gyūki)* disfarçada de peixe!\nSeu chakra é tão intenso que paralisa todos à sua volta.\nCom sorte, você escapa com um fragmento dela.\n🏆 +25🏅 pontos!";
    }
}

module.exports = { Pescaria };
