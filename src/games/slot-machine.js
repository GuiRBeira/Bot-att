// Função para gerar símbolos aleatórios
function getRandomSymbol() {
    const symbols = ['🍒', '🔔', '💎', '🍀', '🍇', '🍋']; // Lista de símbolos
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}

// Função para rodar a caça-níqueis
function playSlotMachine(aposta) {
    const slot1 = getRandomSymbol();
    const slot2 = getRandomSymbol();
    const slot3 = getRandomSymbol();

    // Exibe os três símbolos
    const result = `🎰 | ${slot1} | ${slot2} | ${slot3} | 🎰`;

    // Verifica se o jogador ganhou ou perdeu
    if (slot1 === slot2 && slot2 === slot3) {
        aposta = aposta * 50; // Multiplica o valor da aposta por 50
        return `${result}\n🎉 Parabéns! Você ganhou ${aposta}🔰! 🎉`;
    } else {
        return `${result}\n😢 Que pena, você perdeu ${aposta}🔰. Tente novamente!`;
    }
}

// Exporta a função para uso externo
module.exports = {
    playSlotMachine
};
