// pages/ListaProdutos.jsx - PÁGINA "/"
// Requisitos atendidos aqui:
//  - GET com fetch + useEffect + useState (lista de cards)
//  - Componentização (CartaoProduto, Mensagem)
//  - Busca por texto e filtro por categoria
//  - Estados: carregando e erro
//
// FLUXO DA PÁGINA:
//  1. A página abre -> useEffect dispara o GET (carregando = true)
//  2. A resposta chega -> setProdutos(...) e carregando = false
//  3. React redesenha a tela com os cards
//  4. Se o usuário buscar/filtrar, o estado muda -> useEffect roda de novo
import { useState, useEffect } from 'react';
import CartaoProduto from '../components/CartaoProduto.jsx';
import Mensagem from '../components/Mensagem.jsx';
import {
  listarProdutos,
  buscarProdutos,
  listarCategorias,
  listarPorCategoria,
} from '../services/produtosService.js';

export default function ListaProdutos() {
  // ---- ESTADOS (cada useState guarda um "pedaço" de informação) ----
  const [produtos, setProdutos] = useState([]); // dados vindos da API
  const [categorias, setCategorias] = useState([]); // opções do <select>
  const [carregando, setCarregando] = useState(true); // mostrando "Carregando..."?
  const [erro, setErro] = useState(''); // texto do erro ('' = sem erro)

  // Campo de busca é "controlado": o que está digitado fica em "texto".
  // "termoBusca" é o termo JÁ ENVIADO (só muda ao clicar em Buscar).
  const [texto, setTexto] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const [categoria, setCategoria] = useState(''); // '' = todas

  // ---- EFEITO 1: carrega as categorias UMA vez ----
  // O array vazio [] no final significa: "rode só quando a página abrir".
  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .catch(() => {
        // Se falhar, só não teremos o filtro; a lista continua funcionando.
      });
  }, []);

  // ---- EFEITO 2: carrega os produtos ----
  // O array [termoBusca, categoria] significa: "rode de novo SEMPRE que
  // um desses dois valores mudar". É assim que busca e filtro funcionam.
  useEffect(() => {
    // Flag para ignorar respostas "velhas": se o usuário mudar o filtro
    // antes da resposta anterior chegar, descartamos a antiga.
    let ignorar = false;

    async function carregar() {
      setCarregando(true);
      setErro('');

      try {
        // Escolhe qual endpoint chamar conforme o que o usuário pediu.
        let dados;
        if (termoBusca !== '') {
          dados = await buscarProdutos(termoBusca);
        } else if (categoria !== '') {
          dados = await listarPorCategoria(categoria);
        } else {
          dados = await listarProdutos();
        }

        // A API devolve { products: [...] }, guardamos só o array.
        if (!ignorar) setProdutos(dados.products);
      } catch (e) {
        if (!ignorar) setErro(e.message || 'Não foi possível carregar os produtos.');
      } finally {
        // finally roda sempre (deu certo ou errado): esconde o "Carregando".
        if (!ignorar) setCarregando(false);
      }
    }

    carregar();

    // Função de limpeza: roda antes do próximo efeito (ou ao sair da página).
    return () => {
      ignorar = true;
    };
  }, [termoBusca, categoria]);

  // ---- AÇÕES DO USUÁRIO ----

  // Botão "Buscar" (submit do form): aplica o termo e zera a categoria.
  function buscar(event) {
    event.preventDefault(); // impede o navegador de recarregar a página
    setCategoria('');
    setTermoBusca(texto.trim());
  }

  // Select de categoria: aplica o filtro e limpa a busca.
  function filtrarCategoria(event) {
    setTexto('');
    setTermoBusca('');
    setCategoria(event.target.value);
  }

  // ---- TELA (JSX) ----
  return (
    <section>
      <h1>Produtos</h1>

      <div className="filtros">
        {/* Busca por texto */}
        <form onSubmit={buscar} role="search">
          <label htmlFor="busca">Buscar produto</label>
          <div className="linha-busca">
            <input
              id="busca"
              type="text"
              placeholder="Ex.: phone, mascara..."
              value={texto}
              onChange={(event) => setTexto(event.target.value)}
            />
            <button type="submit">Buscar</button>
          </div>
        </form>

        {/* Filtro por categoria */}
        <div>
          <label htmlFor="categoria">Categoria</label>
          <select id="categoria" value={categoria} onChange={filtrarCategoria}>
            <option value="">Todas</option>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Renderização condicional: só aparece o que combina com o estado */}
      {carregando && <Mensagem tipo="carregando" texto="Carregando produtos..." />}
      {erro && <Mensagem tipo="erro" texto={erro} />}

      {!carregando && !erro && produtos.length === 0 && (
        <Mensagem tipo="carregando" texto="Nenhum produto encontrado." />
      )}

      {/* .map() transforma cada produto do array em um <CartaoProduto>.
          "key" é obrigatório: ajuda o React a identificar cada item. */}
      <div className="grade">
        {!carregando &&
          produtos.map((p) => <CartaoProduto key={p.id} produto={p} />)}
      </div>
    </section>
  );
}
