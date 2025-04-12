// Função para gerar o menu de opções
function getMenu() {
    return `🎮 *Menu de Jogos* 🎮
    
1. 🃏 *Blackjack*
   - Comando: !blackjack ou bj
   - Comprar carta: !comprar ou c
   - Parar: !parar ou p
   
2. 🎰 *Slot Machine*
   - Comando: !slot
   
3. 🎡 *Roleta*
   - Comando: !roleta [número] [cor] [aposta]
   - Exemplo: !roleta 17 vermelho 10
   - Lembre-se os números de uma roleta de cassino variam de 0 a 36

Digite um dos comandos para começar a jogar!`;
}

module.exports = {
    getMenu
};