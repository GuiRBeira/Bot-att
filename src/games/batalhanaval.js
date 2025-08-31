// Lista de símbolos possíveis
const simbolos = ["🛳", "⛴", "⛵", "🛟", "⚓", "💣"];

// Gera um gabarito aleatório
function gerarGabarito(linhas = 6, colunas = 6) {
  const letras = ["A", "B", "C", "D", "E", "F"];
  let gabarito = {};

  for (let i = 0; i < linhas; i++) {
    gabarito[letras[i]] = [];
    for (let j = 0; j < colunas; j++) {
      const random = Math.floor(Math.random() * simbolos.length);
      gabarito[letras[i]].push(simbolos[random]);
    }
  }
  return gabarito;
}

// Converte o gabarito em string formatada pro WhatsApp
function Gabarito(gabarito) {
  let texto = "💫➜ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣\n";
  for (const linha in gabarito) {
    texto += ` ( ${linha} ) ${gabarito[linha].join(" ")}\n`;
  }
  return texto;
}

module.exports = { 
    Gabarito 
};