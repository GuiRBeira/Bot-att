function playRoulette(betNumber, betColor, betAmount) {
    // Verificar se a aposta está no intervalo permitido
    if (betAmount < 10 || betAmount > 100) {
        return 'A aposta mínima é 10 e a máxima é 100.';
    }

    const rouletteNumber = Math.floor(Math.random() * 37); // Números de 0 a 36
    const rouletteColor = Math.random() < 0.5 ? 'vermelho' : 'preto';
    
    let result = `Número sorteado: ${rouletteNumber} (${rouletteColor})\n`;

    // Verifica se o jogador acertou o número e a cor
    if (betNumber == rouletteNumber && betColor === rouletteColor) {
        const prize = betAmount * 10; // Prêmio multiplicado por 10 se acertar número e cor
        result += `🎉 Você acertou o número e a cor! Parabéns! Você ganhou ${prize}!🔰 🎉`;
    } 
    // Verifica se o jogador acertou apenas o número
    else if (betNumber == rouletteNumber) {
        const prize = betAmount * 5; // Prêmio multiplicado por 5 se acertar apenas o número
        result += `👍 Você acertou o número! Você ganhou ${prize}🔰!`;
    } 
    // Verifica se o jogador acertou apenas a cor
    else if (betColor === rouletteColor) {
        const prize = betAmount * 2; // Prêmio multiplicado por 2 se acertar apenas a cor
        result += `👍 Você acertou a cor! Você ganhou ${prize}🔰!`;
    } 
    // Se não acertar nem número nem cor
    else {
        result += `😢 Que pena, você perdeu ${betAmount}🔰.`;
    }
    
    return result;
}

module.exports = {
    playRoulette
};
