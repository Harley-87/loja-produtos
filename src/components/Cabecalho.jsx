// components/Cabecalho.jsx - COMPONENTE de navegação (menu)
// NavLink é um <Link> especial: ele sabe qual rota está ativa e
// adiciona a classe "active" (e aria-current="page") automaticamente.
// Navegar com Link/NavLink NÃO recarrega a página (isso é uma SPA).
import { NavLink } from 'react-router-dom';

export default function Cabecalho() {
  return (
    // <header> e <nav> = HTML semântico. aria-label descreve o menu
    // para leitores de tela.
    <header className="cabecalho">
      <p className="logo">
        <img src="/logo.svg" alt="" width="36" height="36" />
        Loja DummyJSON
      </p>
      <nav aria-label="Menu principal">
        {/* "end" faz o link "/" ficar ativo só em "/" e não em todas as rotas */}
        <NavLink to="/" end>
          Produtos
        </NavLink>
        <NavLink to="/novo">Novo produto</NavLink>
      </nav>
    </header>
  );
}
