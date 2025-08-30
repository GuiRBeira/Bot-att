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

// Listar apenas arenas ativas
function listarArenasDisponiveis() {
  const arenas = carregarArenas()
  return arenas.filter(a => a.disponivel)
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
    carregarArenas,
    salvarArenas,
    listarArenasDisponiveis,
    marcarArenaDisponivel,
    sortearArenaDisponivel
}
