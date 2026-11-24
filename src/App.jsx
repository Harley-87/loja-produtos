// App.jsx - ESTRUTURA GERAL + TABELA DE ROTAS
// Decide "qual página aparece em qual endereço (URL)".
// O cabeçalho fica fora do <Routes>, então aparece em todas as páginas.
import { Routes, Route, Link } from 'react-router-dom';
import Cabecalho from './components/Cabecalho.jsx';
import ListaProdutos from './pages/ListaProdutos.jsx';
import DetalheProduto from './pages/DetalheProduto.jsx';
import NovoProduto from './pages/NovoProduto.jsx';

export default function App() {
  return (
    <>
      <Cabecalho />

      {/* <main> = HTML semântico: indica o conteúdo principal da página */}
      <main className="conteudo">
        {/* <Routes> olha a URL atual e mostra SÓ a <Route> que combina */}
        <Routes>
          {/* Rota 1: endereço "/" -> lista de produtos (GET /products) */}
          <Route path="/" element={<ListaProdutos />} />

          {/* Rota 2: "/produto/12" -> detalhe. ":id" é um parâmetro dinâmico
              que o componente lê com useParams(). */}
          <Route path="/produto/:id" element={<DetalheProduto />} />

          {/* Rota 3: "/novo" -> formulário (POST /products/add) */}
          <Route path="/novo" element={<NovoProduto />} />

          {/* Rota coringa "*": qualquer endereço que não existe */}
          <Route
            path="*"
            element={
              <section>
                <h1>Página não encontrada</h1>
                <Link to="/">Voltar para a lista</Link>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="rodape">
        <p>Projeto Faculdade - dados fictícios da API DummyJSON</p>
      </footer>
    </>
  );
}
