const fs = require("fs");

const limparString = (str) => str.toUpperCase().replace(/[^A-Z\s]/g, "");
const stringValida = (str) => str.toUpperCase() === limparString(str);
const formatarString = (str) => limparString(str).replace(/\s+/g, "");
const listaPalavras = new Set(
  fs.readFileSync("words.txt", "utf-8").split("\n")
);

function gerarAnagramas(str) {
  if (str.length <= 1) {
    return [str];
  }

  const anagramas = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const restante = str.slice(0, i) + str.slice(i + 1);
    const anagramasRestantes = gerarAnagramas(restante);

    for (let j = 0; j < anagramasRestantes.length; j++) {
      anagramas.push(char + anagramasRestantes[j]);
    }
  }
  return anagramas;
}

function encontrarFrases(palavra) {
  function gerarCombinacao(palavraRestante, combinacaoAtual) {
    if (palavraRestante === "") {
      if (combinacaoAtual.every((palavra) => listaPalavras.has(palavra))) {
        frases.push(combinacaoAtual.join(" "));
      }
      return;
    }

    for (let i = 1; i <= palavraRestante.length; i++) {
      const novaPalavra = palavraRestante.slice(0, i);
      if (listaPalavras.has(novaPalavra)) {
        const novaCombinacao = [...combinacaoAtual, novaPalavra];
        gerarCombinacao(palavraRestante.slice(i), novaCombinacao);
      }
    }
  }

  const frases = [];
  gerarCombinacao(palavra, [], 0);
  return frases;
}

function exibirTodosAnagramas(str) {
  function encontrarAnagramas(str) {
    const anagramas = gerarAnagramas(str);

    const listaAnagramas = [];
    for (let i = 0; i < anagramas.length; i++) {
      const frases = encontrarFrases(anagramas[i]);
      if (frases.length) listaAnagramas.push(...frases);
    }

    return listaAnagramas;
  }

  if (!stringValida(str)) {
    throw new Error(`A string ${str} contém caracteres inválidos.`);
  }

  const todosAnagramas = encontrarAnagramas(formatarString(str));

  const anagramasOrdenadosUnicos = [
    ...new Set(
      todosAnagramas.map((frase) => frase.split(" ").sort().join(" "))
    ),
  ];

  anagramasOrdenadosUnicos.forEach((element) => console.log(element));
}

module.exports = { exibirTodosAnagramas };
