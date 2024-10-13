const { exibirTodosAnagramas } = require("./gerarAnagramas");

const expressao = process.argv[2];

try {
  exibirTodosAnagramas(expressao);
} catch (error) {
  console.error(error.message);
}
