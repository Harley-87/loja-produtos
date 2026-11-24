// pages/DetalheProduto.jsx - PÁGINA "/produto/:id"
// Requisitos atendidos aqui:
//  - Detalhamento (GET de UM produto pelo id da URL)
//  - Outra operação HTTP: DELETE
//  - Estados de carregando, erro e sucesso
//
// FLUXO:
//  1. useParams() lê o :id da URL (ex.: /produto/5 -> id = "5")
//  2. useEffect chama GET /products/5
//  3. Botão "Excluir" chama DELETE /products/5 e mostra o resultado
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Mensagem from '../components/Mensagem.jsx';
import { buscarProduto, excluirProduto } from '../services/produtosService.js';

export default function DetalheProduto() {
  // Lê o parâmetro dinâmico definido na rota ("/produto/:id").
  const { id } = useParams();

  const [produto, setProduto] = useState(null); // null = ainda não chegou
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // Estados do DELETE
  const [excluindo, setExcluindo] = useState(false); // requisição em andamento
  const [excluido, setExcluido] = useState(null); // resposta da API

  // GET do produto. Roda ao abrir a página e se o id da URL mudar.
  useEffect(() => {
    let ignorar = false;

    async function carregar() {
      setCarregando(true);
      setErro('');
      setExcluido(null);

      try {
        const dados = await buscarProduto(id);
        if (!ignorar) setProduto(dados);
      } catch (e) {
        if (!ignorar) setErro(e.message || 'Não foi possível carregar o produto.');
      } finally {
        if (!ignorar) setCarregando(false);
      }
    }

    carregar();
    return () => {
      ignorar = true;
    };
  }, [id]);

  // Ação do botão "Excluir produto" -> DELETE
  async function excluir() {
    // confirm() é uma caixa nativa de "OK / Cancelar". Evita exclusão sem querer.
    if (!window.confirm('Deseja excluir este produto?')) return;

    setExcluindo(true);
    setErro('');

    try {
      const resposta = await excluirProduto(id);
      setExcluido(resposta); // guarda { isDeleted: true, deletedOn: ... }
    } catch (e) {
      setErro(e.message || 'Não foi possível excluir o produto.');
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <section>
      <Link to="/">← Voltar para a lista</Link>

      {carregando && <Mensagem tipo="carregando" texto="Carregando produto..." />}
      {erro && <Mensagem tipo="erro" texto={erro} />}

      {/* Resultado do DELETE apresentado ao usuário */}
      {excluido && (
        <Mensagem
          tipo="sucesso"
          texto={`Produto "${excluido.title}" excluído (simulado) em ${new Date(
            excluido.deletedOn,
          ).toLocaleString('pt-BR')}.`}
        />
      )}

      {/* Só desenha os detalhes quando o produto existe e não foi excluído */}
      {produto && !excluido && (
        <article className="detalhe">
          <img src={produto.thumbnail} alt={produto.title} />
          <div>
            <h1>{produto.title}</h1>
            <p className="categoria">{produto.category}</p>
            <p>{produto.description}</p>
            <p className="preco">US$ {produto.price}</p>
            <p>Avaliação: {produto.rating} / 5</p>
            <p>Estoque: {produto.stock} unidades</p>

            {/* disabled evita clicar duas vezes enquanto a requisição roda */}
            <button type="button" className="perigo" onClick={excluir} disabled={excluindo}>
              {excluindo ? 'Excluindo...' : 'Excluir produto'}
            </button>
          </div>
        </article>
      )}
    </section>
  );
}
