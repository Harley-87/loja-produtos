// pages/NovoProduto.jsx - PÁGINA "/novo"
// Requisito atendido: formulário CONTROLADO + validação + POST.
// Segue o mesmo padrão da aula guiada (useState, value/onChange,
// preventDefault, trim, setErro + return).
//
// FLUXO AO CLICAR EM "Cadastrar produto":
//  1. onSubmit chama enviarProduto()
//  2. preventDefault() evita recarregar a página
//  3. Validações: se algo estiver errado -> setErro(...) e return (para)
//  4. Se tudo OK -> POST /products/add com os dados em JSON
//  5. Sucesso -> mostra a resposta e limpa os campos
//     Falha   -> mostra mensagem de erro
import { useState } from 'react';
import Mensagem from '../components/Mensagem.jsx';
import { criarProduto } from '../services/produtosService.js';

export default function NovoProduto() {
  // Um useState para cada campo do formulário (campos controlados)
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');

  // Estados da interface
  const [erro, setErro] = useState(''); // erro de validação OU da API
  const [enviando, setEnviando] = useState(false); // POST em andamento
  const [criado, setCriado] = useState(null); // produto devolvido pela API

  async function enviarProduto(event) {
    event.preventDefault();
    setCriado(null);

    // ---- VALIDAÇÃO BÁSICA ----
    // trim() tira espaços das pontas: "   " conta como vazio.
    if (titulo.trim().length < 3) {
      setErro('O título deve ter pelo menos 3 caracteres.');
      return; // interrompe: não envia nada
    }

    if (descricao.trim() === '') {
      setErro('Informe a descrição.');
      return;
    }

    // O valor de um input vem sempre como TEXTO; Number() converte.
    if (preco === '' || Number(preco) <= 0) {
      setErro('Informe um preço maior que zero.');
      return;
    }

    if (categoria === '') {
      setErro('Selecione uma categoria.');
      return;
    }

    // ---- ENVIO (POST) ----
    setErro('');
    setEnviando(true);

    try {
      // Monta o objeto que vira o corpo JSON da requisição.
      const resposta = await criarProduto({
        title: titulo.trim(),
        description: descricao.trim(),
        price: Number(preco),
        category: categoria,
      });

      setCriado(resposta); // guarda a resposta para mostrar na tela

      // Limpa os campos (a resposta fica salva em "criado", por isso
      // continua visível mesmo com o formulário vazio).
      setTitulo('');
      setDescricao('');
      setPreco('');
      setCategoria('');
    } catch (e) {
      setErro(e.message || 'Não foi possível cadastrar o produto.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="pagina-estreita">
      <h1>Novo produto</h1>

      {/* onSubmit dispara com o botão OU com Enter em um campo */}
      <form onSubmit={enviarProduto} className="formulario">
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            rows="3"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="preco">Preço (US$)</label>
          <input
            id="preco"
            name="preco"
            type="number"
            min="0"
            step="0.01"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            <option value="beauty">beauty</option>
            <option value="fragrances">fragrances</option>
            <option value="furniture">furniture</option>
            <option value="groceries">groceries</option>
          </select>
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Cadastrar produto'}
        </button>
      </form>

      {/* Feedback ao usuário: erro (alert) e sucesso (status) */}
      {erro && <Mensagem tipo="erro" texto={erro} />}

      {criado && (
        <Mensagem
          tipo="sucesso"
          texto={`Produto "${criado.title}" cadastrado (simulado) com id ${criado.id}, categoria ${criado.category}, preço US$ ${criado.price}.`}
        />
      )}
    </section>
  );
}
