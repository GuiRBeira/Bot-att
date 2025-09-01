function Pescaria() {
    const chance = Math.floor(Math.random() * 100);

    if (chance < 15) {
        resultado = "🐟 Você fisgou um *peixe comum*!\nO cheiro de peixe assado já bateu na vila.\n+5🏅 pontos!";
    } else if (chance < 18) {
        resultado = "🍢 Um *espetinho de carne* boiou até sua vara!\nVocê come sem pensar duas vezes.\n+1❤️ de vida!";
    } else if (chance < 35) {
        resultado = "🧨 Você encontrou uma *Bomba Ninja* submersa!\nVocê poderá escolher um jogador para receber -1💔 de dano.\n🎯 Use com sabedoria (ou não).";
    } else if (chance < 40) {
        resultado = "🐸 Um *sapo ninja de AmeGakure* pulou na sua linha!\nCom um golpe rápido, ele rouba o último peixe que você tinha pescado!\n💨 Último peixe perdido!";
    } else if (chance < 60) {
        resultado = "💥 Um selo explosivo estava preso à isca!\nA explosão te atinge em cheio.\n-1💔 de vida!";
    } else if (chance < 70) {
        resultado = "🥷 Sua vara enroscou na vara do seu colega ninja...\nVocê aproveita para *roubar o último peixe pescado* por ele!\n🎯 Esperteza também é uma habilidade ninja.";
    } else if (chance < 85) {
        resultado = "🌊 Um tentáculo gigantesco irrompe da água — *Gyūki está furioso*!\nEle lança uma Bijudama na sua direção.\n🔥 -3💔 de vida!";
    } else if (chance < 93) {
        resultado = "🐡 Você fisgou um *peixe raro*, com escamas brilhando chakra!\nOs anciãos diriam que ele traz sorte.\n💎 +10🏅 pontos!";
    } else if (chance < 97) {
        resultado = "🎁 Surpresa! Você encontrou um *Saco de Tesouro* flutuando!\nEste prêmio é especial e deve ser **contatado com o mestre da Vila** ao final do jogo.\n🏆 Valor extra a negociar!";
    } else {
        resultado = "🐙 Um redemoinho surge na água... e dela emerge a *Oito Caudas (Gyūki)* disfarçada de peixe!\nSeu chakra é tão intenso que paralisa todos à sua volta.\nCom sorte, você escapa com um fragmento dela.\n🏆 +25🏅 pontos!";
    }
    // Função de evento exclusivo da Vila da Chuva
    function EventoVilaDaChuva() {
        const chanceEvento = Math.floor(Math.random() * 100);

        if (chanceEvento < 40) {
            return "🌧️ Uma leve chuva cai sobre a vila, nada de especial acontece.";
        } else if (chanceEvento < 65) {
            return "💨 Um vento repentino espalha folhas e você encontra algumas moedas pelo chão.\n💰 +5🏅 pontos!";
        } else if (chanceEvento < 85) {
            return "🌀 Uma corrente misteriosa carrega um *Saco de Tesouro* até você!\n🎁 Prêmio especial: contate o mestre da Vila da Chuva para reivindicar.";
        } else if (chanceEvento < 95) {
            return "🔥 Um raio cai próximo à vila! Você se esquiva por pouco.\n💔 -1 de vida!";
        } else {
            return "💎 Você encontra uma pedra preciosa brilhante!\n🏆 +10🏅 pontos!";
        }
    }

    // Evento aleatório da Vila da Chuva (50% de chance)
    if (Math.random() < 0.5) {
        resultado += '\n\n✨ Evento aleatório da Vila da Chuva:\n' + EventoVilaDaChuva();
    }

    return resultado;
}

module.exports = { Pescaria };
