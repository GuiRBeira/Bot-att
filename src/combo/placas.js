function placa(arg, nome, cla, rank, nome1, cla1, rank1) {
    // Obtém a data atual
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, "0"); // Dia com dois dígitos
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês (Janeiro = 0, então somamos 1)
    const ano = String(data.getFullYear()).slice(-2); // Pega apenas os dois últimos dígitos do ano

    return `*○➖➖❰ ${dia} ⟦○ ☆ ❲${mes}❳ ☆ ○⟧ ${ano} ❱➖➖○*
*${rank} ⟦❝ ${cla} ${nome} ${cla} ❞ ⟧ ${rank}*
❰ ❤ ${arg} ❤ ❱ ♧ ❰ 🔹 ${2*arg} 🔹 ❱
●
●
●
●
${rank1} ⟦❝ ${cla1} ${nome1} ${cla1} ❞ ⟧ ${rank1}
*❰ ❤ ${arg} ❤ ❱ ♧ ❰ 🔹 ${2*arg} 🔹 ❱*
●
●
●
●
*○➖➖❰ ${dia} ⟦○ ☆ ❲${mes}❳ ☆ ○⟧ ${ano} ❱➖➖○*`;
}