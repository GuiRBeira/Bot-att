const deck = [];
const players = {}; 

// Função para criar e embaralhar o baralho
function createDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    deck.length = 0; // Limpa o baralho anterior

    for (const suit of suits) {
        for (const value of values) {
            deck.push(`${value}${suit}`);
        }
    }

    // Embaralha o baralho
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Função para calcular a pontuação da mão de um jogador
function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;

    for (const card of hand) {
        const value = card.slice(0, -1); // Pega o valor da carta, ignorando o naipe

        if (['J', 'Q', 'K'].includes(value)) {
            score += 10; // Valetes, Damas e Reis valem 10
        } else if (value === 'A') {
            aceCount++;
            score += 11; // Assumimos que o Ás vale 11, ajustaremos mais tarde se necessário
        } else {
            score += parseInt(value); // Para números de 2 a 10
        }
    }

    // Ajusta a pontuação se houver Ás e o total for maior que 21
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score;
}

// Função para iniciar o jogo de Blackjack
async function playBlackjack(jid) {
    if (players[jid]) {
        return 'Você já está jogando!';
    }

    players[jid] = { hand: [], score: 0 };
    createDeck();

    // Distribui duas cartas para o jogador
    players[jid].hand.push(deck.pop(), deck.pop());
    players[jid].score = calculateScore(players[jid].hand);

    // Verifica se o jogador já passou de 21
    if (players[jid].score > 21) {
        const finalScore = players[jid].score;
        const aux = players[jid].hand;
        delete players[jid]; // Remove o jogador após a derrota
        return `Você ultrapassou 21!\nA casa venceu!\nSuas cartas: ${aux.join(', ')}\nSua pontuação final: ${finalScore}`;
    } else if (players[jid].score === 21) {
        const finalScore = players[jid].score;
        const aux = players[jid].hand;
        delete players[jid]; // Remove o jogador após ganhar com 21
        return `Parabéns!\n Você bateu 21!\n Suas cartas: ${aux.join(', ')}\nPontuação: ${finalScore}\nJogo terminado!`;
    }

    return `Suas cartas: ${players[jid].hand.join(', ')}\nPontuação: ${players[jid].score}\nDeseja 'comprar' mais uma carta ou 'parar'?`;
}

// Função para comprar uma carta
function buyCard(jid) {
    if (!players[jid]) {
        return 'Você não está jogando Blackjack! Inicie um novo jogo com !blackjack.';
    }

    const newCard = deck.pop();
    players[jid].hand.push(newCard);
    players[jid].score = calculateScore(players[jid].hand);

    // Verifica se o jogador ultrapassou 21
    if (players[jid].score > 21) {
        const finalScore = players[jid].score;
        const aux = players[jid].hand;
        delete players[jid]; // Remove o jogador após a derrota
        return `Você ultrapassou 21!\nA casa venceu!\nSuas cartas: ${aux.join(', ')}\nSua pontuação final: ${finalScore}`;
    } else if (players[jid].score === 21) {
        const finalScore = players[jid].score;
        const aux = players[jid].hand;
        delete players[jid]; // Remove o jogador após ganhar com 21
        return `Parabéns!\nVocê bateu 21!\nSuas cartas: ${aux.join(', ')}\nPontuação: ${finalScore}\nJogo terminado!`;
    }

    return `Você comprou: ${newCard}\nSuas cartas: ${players[jid].hand.join(', ')}\nPontuação: ${players[jid].score}\nDeseja 'comprar' mais uma carta ou 'parar'?`;
}


// Função para parar o jogo e mostrar o resultado final
function stopGame(jid) {
    if (!players[jid]) {
        return 'Você não está jogando Blackjack!';
    }

    const finalScore = players[jid].score;
    const houseActions = playHouse(); // A casa joga e decidimos suas ações

    let resultMessage = `Jogo terminado! Sua pontuação final: ${finalScore}\n`;
    resultMessage += `${houseActions}\n\nPontuação da casa: ${house.score}\n`;

    // Comparação entre as pontuações do jogador e da casa
    if (house.score > 21 || finalScore > house.score) {
        resultMessage += 'Você venceu a casa!';
    } else if (finalScore < house.score) {
        resultMessage += 'A casa venceu!';
    } else {
        resultMessage += 'Empate!';
    }

    delete players[jid]; // Remove o jogador
    return resultMessage;
}

// Função para emular jogadas da casa (comprar ou parar)
function playHouse() {
    let actions = [];

    // Enquanto a pontuação for menor que 17, a casa continua comprando cartas
    while (house.score < 18) {
        const newCard = deck.pop();
        house.hand.push(newCard);
        house.score = calculateScore(house.hand);
        actions.push(`A casa comprou ${newCard}, nova pontuação: ${house.score}`);
    }

    if (house.score >= 17) {
        actions.push(`A casa decidiu parar com a pontuação de: ${house.score}`);
    }

    return actions.join('\n'); // Retorna todas as ações da casa
}


// Exporta as funções para uso em outros módulos
module.exports = {
    playBlackjack,
    buyCard,
    stopGame
};