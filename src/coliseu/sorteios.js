const fs = require("fs")
const path = require("path")

const arenasPath = path.join(__dirname, "arenas.json")

// Carregar arenas
function carregarArenas() {
  const data = fs.readFileSync(arenasPath, "utf8")
  return JSON.parse(data)
}

// Salvar arenas
function salvarArenas(arenas) {
  fs.writeFileSync(arenasPath, JSON.stringify(arenas, null, 2))
}

// Função para adicionar arena
function adicionarArena(nome, descricao) {
    const arenas = carregarArenas();

    // Verifica se já existe
    if (arenas.find(a => a.nome.toLowerCase() === nome.toLowerCase())) {
        throw new Error(`⚠️ A arena "${nome}" já existe!`);
    }

    // Adiciona
    arenas.push({ nome, descricao, disponivel: true });
    salvarArenas(arenas);

    return `✅ Arena "${nome}" adicionada com sucesso!`;
}

// Listar apenas arenas ativas
function listarArenasDisponiveis() {
  const arenas = carregarArenas()
      // Retorna uma string legível
    return arenas.map(a => `• ${a.nome} ${a.disponivel ? "✅" : "❌"}\n`).join("\n\n");
}

// Alterar disponibilidade de uma arena
function marcarArenaDisponivel(id, status) {
  const arenas = carregarArenas()
  const arena = arenas.find(a => a.id === id)
  if (arena) {
    arena.disponivel = status
    salvarArenas(arenas)
  }
}

// Sortear arena disponível
function sortearArenaDisponivel() {
    const disponiveis = listarArenasDisponiveis();

    if (disponiveis.length === 0) {
        throw new Error('⚠️ Não há arenas disponíveis!');
    }

    const sorteada = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    marcarArenaIndisponivel(sorteada.nome);

    return `${sorteada.nome}\n${sorteada.descricao}`;
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
    sortearPatente,
    sortearElemento,
    listarArenasDisponiveis,
    marcarArenaDisponivel,
    sortearArenaDisponivel,
    adicionarArena
}
