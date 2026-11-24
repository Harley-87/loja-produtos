// services/produtosService.js - ACESSO À API
// Todas as chamadas HTTP ficam AQUI. As páginas não usam fetch direto:
// elas só chamam estas funções. Vantagens: código organizado, e se a
// URL da API mudar, alteramos em um único lugar.
//
// Todas as funções são "async": devolvem uma Promise, então quem chama
// usa await (ou .then). O fetch é assíncrono porque a internet demora.

const API_URL = 'https://dummyjson.com/products';

// Função auxiliar usada por todas as outras.
// IMPORTANTE: o fetch NÃO dá erro quando o servidor responde 404 ou 500;
// ele só falha se a internet cair. Por isso conferimos resposta.ok
// (true para status 200-299) e lançamos o erro NÓS MESMOS com "throw".
// Esse erro será capturado pelo try/catch da página -> mensagem na tela.
async function requisitar(url, opcoes) {
  const resposta = await fetch(url, opcoes);

  if (!resposta.ok) {
    throw new Error(`Falha na requisição (status ${resposta.status}).`);
  }

  // resposta.json() converte o texto JSON recebido em objeto JavaScript.
  return resposta.json();
}

// GET /products?limit=12  -> devolve { products: [...], total, skip, limit }
export function listarProdutos() {
  return requisitar(`${API_URL}?limit=12`);
}

// GET /products/search?q=termo -> busca por texto (título, descrição...)
// encodeURIComponent protege caracteres especiais (espaço, &, acento).
export function buscarProdutos(termo) {
  return requisitar(`${API_URL}/search?q=${encodeURIComponent(termo)}&limit=12`);
}

// GET /products/category-list -> devolve um array de textos: ["beauty", ...]
export function listarCategorias() {
  return requisitar(`${API_URL}/category-list`);
}

// GET /products/category/beauty -> mesmo formato da lista, só dessa categoria
export function listarPorCategoria(categoria) {
  return requisitar(`${API_URL}/category/${encodeURIComponent(categoria)}?limit=12`);
}

// GET /products/5 -> devolve UM produto (objeto)
export function buscarProduto(id) {
  return requisitar(`${API_URL}/${id}`);
}

// POST /products/add -> cria um produto.
// - method: 'POST' indica que estamos ENVIANDO dados.
// - headers: avisa ao servidor que o corpo é JSON.
// - body: o objeto convertido em texto JSON (JSON.stringify).
// A API devolve o produto "criado" com um id novo, mas NÃO salva de verdade.
export function criarProduto(dados) {
  return requisitar(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
}

// DELETE /products/5 -> "exclui" o produto.
// Devolve o produto com { isDeleted: true, deletedOn: "data/hora" }.
// Também é simulado: o produto continua existindo na API.
export function excluirProduto(id) {
  return requisitar(`${API_URL}/${id}`, { method: 'DELETE' });
}
