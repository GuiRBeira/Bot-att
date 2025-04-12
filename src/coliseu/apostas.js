const fs = require('fs');

function processarAposta(textoFicha) {
    console.log('CHEGOU NA FUNCAO APOSTAS');
    try {
        const regexNinja = /°🎲➺ *Ninja : (.+?) ❰(.+?)\/(.+?)❱*/;
        const regexValor = /°🎲➺ *Valor : (\d+) ❰🔰❱*/;
        const regexApostador = /°🎲➺ *Apostador : (.+?) ❰(.+?)\/(.+?)❱*/;

        const matchNinja = textoFicha.match(regexNinja);
        const matchValor = textoFicha.match(regexValor);
        const matchApostador = textoFicha.match(regexApostador);

        if (!matchNinja || !matchValor || !matchApostador) {
            return "Ficha inválida! Não foi adicionada às apostas.";
        }

        const aposta = {
            ninja: {
                nick: matchNinja[1],
                clã: matchNinja[2],
                patente: matchNinja[3]
            },
            valor: parseInt(matchValor[1]),
            apostador: {
                nick: matchApostador[1],
                clã: matchApostador[2],
                patente: matchApostador[3]
            }
        };

        const linhaAposta = `Ninja: ${aposta.ninja.nick} (${aposta.ninja.clã}/${aposta.ninja.patente}) | ` +
                            `Valor: ${aposta.valor} | ` +
                            `Apostador: ${aposta.apostador.nick} (${aposta.apostador.clã}/${aposta.apostador.patente})\n`;

        fs.appendFileSync('apostas.txt', linhaAposta);

        return "Ficha válida! Aposta adicionada.";
    } catch (error) {
        console.error("Erro ao processar a aposta:", error);
        return "Ocorreu um erro ao processar a ficha.";
    }
}
 
module.exports = { 
    processarAposta
}