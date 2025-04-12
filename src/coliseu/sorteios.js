function escolherArenaAleatoria() {
    const arenas = [
        { nome: "*Arena Trovão ⚡*", descricao: `A arena trovão, foi construída  após a guerra em Kumogakure, os ninjas que nela lutam possuem a habilidade,  "manto de chakra estilo raio", o mesmo utilizado pelo Raikage,  seus efeitos aumentam drasticamente sua velocidade e resistência.
( As resistencias Variam de acordo com a patente da luta)
[🈂20%🔻]
[✳30%🔻]
[✴40%🔻]
["💠+" 50%🔻]`},
        { nome: "*➜ Arena Uchiha ⭕*", descricao: `Um espaço criado para um treinamento no estilo Uchiha, ninjas que lutam nessa Arena possuem o Sharingan, tendo a habilidade de copiar até 5 jutsus do oponente com um gasto de ( -20%🔹 ) por jutsu.
(Nessa Arena você poderá copiar qualquer Jutsu do oponente caso não tenha incluindo Rank SS,S,A e etc).` },
        { nome: "*➜ Arena Hyuuga ⚪*", descricao: `O Clã Hyuuga decidiu passar seus conhecimentos adiante, então construíram um baluarte (estrutura militar usada para defesas em guerras), para então treinar seus discípulos, nessa arena os pontos de chakra do inimigo são visíveis, e cada ataque acertado drena uma parte do chakra do oponente.
(Caso aceite dano levará (-30%🔹) no round`},
        { nome: "*➜ Arena Might-Guy🥋*", descricao: `Guy, resolveu abrir uma academia para ensinar taijutsu aos ninjas de Konohagakure, por seus conhecimentos avançados ele ensinou técnicas extremamente avançadas a  seus ninjas sendo eles capazes de realizar a abertura dos oito portões internos.
(Taijutsu Especial Ignora Qualquer Ativação imune a taijutsu)` },
        { nome: "*➜ Arena Karin 🌐*", descricao: `Karin Cria um campo sensorial perfeito tornando essa arena uma das mais difíceis de se batalhar.

(Ambos os ninjas possuem habilidades sensoriais perfeitas)

(Imunidade a sensor não funciona nessa arena).` },
        { nome: "*➜  Arena do Vazio Silencioso 🔮*", descricao: `
No Vazio Silencioso, todas as formas de interferência sutil sejam ecos, drenos contínuos de vitalidade ou reduções de danos são completamente anuladas.` },
        { nome: "*➜ Arena do Ceifeiro 👹*", descricao: `Nesta Arena reside um Ceifeiro da Morte invocado pelo Juíz, o Ceifeiro ataca toda vez que qualquer um dos oponentes estiverem sem defesa, arrancando parte de sua energia vital, sendo assim, ambos perder (-30%❣) de HP caso ataquem sem defesas.` },
        { nome: "*➜ Arena da Luz ✨*", descricao: `Este local foi marcado por uma luz instável e cortante. Toda manipulação de energia aqui causa dor e desgaste físico direto. Todo jutsu ativado consome ( 10% ❣🔹) da vitalidade pois o ambiente fragmenta a estabilidade do chakra dos jogadores.` },
        { nome: "*➜ Arena Prisão Estelar 🪐*", descricao: `Um campo suspenso além da realidade, onde as leis da gravidade foram aniquiladas. Aqui, corpos flutuam, movimentos perdem peso, e golpes físicos tornam-se inúteis diante do vácuo absoluto. Em meio ao silêncio espacial, apenas o controle do chakra pode romper o vazio desta prisão cósmica.
Todos os taijutsus causam ( 0%🔺) de danos.
Esse efeito só é cortado caso um dos oponentes possuir até ( 30%🔹) ou menos de chakra restante ou for paralisado.` },
        { nome: "*➜ Arenas Elementares 💧🌪🔥⚡⛰*", descricao: `Essa são arenas onde os participantes vão receber buffs e debuffs referentes ao elementos da arena, exemplo  +30 🔺 em dano de Katon  e menos - 30 🔺  em dano fuuton na arena de fogo, porém  esse buffs e debuffs será trocados d e luta para luta.` },
        { nome: "*➜ Arena da Prisão de Sangue 🩸*", descricao: `Neste local todas as tentativas de fuga são falhadas, causando um dano de ( 10%❣) sempre que o Ninja tentar utilizar o jutsu de Fuga/Substituição.` },
        { nome: "*➜ Arena Namikaze 〽*", descricao: `Minato Namikaze, era conhecido como  "Relampago Amarelo" temido em todo o mundo ninja, durante sua vida foi considerado o ninja mais rapido, e executava seus inimigos sem eles nem mesmo sentirem a sua presença, seu hiraishin era uma técnica impecável  tanto para ataque quanto para fugir alem de o tornar praticamente imune a habilidades sensoriais podendo aparecer em qualquer lugar devido as suas kunais nesse espaço todos possuem a habilidade Hiraishin.
(Nessa Arena todas as Fugas são imune a sensor)` },
        { nome: "*Arena Estrelar 🌠*", descricao: `A arena estrelar  é a arena perfeita onde foi construída de forma  que seja indestrutível  e  inalterável, onde não restrição, buffs ou debuffs.` },
        { nome: "*➜ Arena Das Cobras🐍*", descricao: `Orochimaru Ensinou a seus ninjas uma técnica um tanto quanto poderosa nessa arena os ninjas possuem uma habilidade secreta ensinada pelo sannin.
( Danos Que seriam Letais deixam o Oponente com 10%♥ de HP apenas uma vez)
 Após receber dano letal, o oponente perde todos os status negativos de perda de vida, como veneno ou sangramento.` },
        { nome: "*➜ Arena do Vigor 🌿*", descricao: `Utilizando de uma técnica secreta desenvolvida pelos cientistas de KonohaGakure,sempre que o oponente utilizar aumento, regeneração de chakra ou hp o outro Ninja recebe ( 10%❣🔹) de Vigor.` },
        { nome: "*➜ Arena da Troca Celestial 🌬*", descricao: `sta Arena especial conjurada pelo Juíz do Coliseu, faz com o status inicial da luta seja alterado, fazendo assim um troca radical no local.

*Status Inicial:*

*200% ❤ // 400%🔹, passa a ser: 400%❤ // 200%🔹.*
`},
        { nome: "*🌀 Campo do Portão Interior 🌀*", descricao: `Um domínio ancestral onde as leis do combate corporal se sobrepõem ao próprio chakra. Diz-se que este espaço ecoa o espírito dos antigos mestres que abriram os Portões Internos, moldando um campo onde a força física é inevitável e o corpo se torna a verdadeira arma.
Todos os Taijutsus, independentemente de sua natureza ou estilo, passam a ser considerados Taijutsu Corporal.
Habilidades que interagem ou ampliam Taijutsu Corporal se aplicam a qualquer Taijutsu utilizado neste campo.` }
    ];
    
    const arenaEscolhida = arenas[Math.floor(Math.random() * arenas.length)];
    return `${arenaEscolhida.nome}\n${arenaEscolhida.descricao}`;
}

function sortearPatente(menorPatente) {
    const patentes = [ {nome: "Gennin"}, {nome: "Chunnin"}, {nome: "Jounnin"}, {nome: "Anbu"}, {nome: "Sannin"}, {nome: "Daimyo"}, {nome: "Kage"}, {nome: "Rikkudo"}];
    // Buscar índice da patente pelo nome
    const index = patentes.findIndex(p => p.nome === menorPatente);
    if (index === -1) throw new Error("Patente inválida" + menorPatente);
    const patentesPossiveis = patentes.slice(0, index + 1);
    return patentesPossiveis[Math.floor(Math.random() * patentesPossiveis.length)];
}

function sortearElemento() {
        const elementos = ['Katon 🔥*', 'Suiton 💧*', 'Doton ⛰*', 'Fuuton 🌪️*', 'Raiton ⚡*'];
        const indiceAleatorio = Math.floor(Math.random() * elementos.length);
        return `*Arena ${elementos[indiceAleatorio]}`;
    }

module.exports = {
    escolherArenaAleatoria,
    sortearPatente,
    sortearElemento
};
