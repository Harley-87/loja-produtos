// components/CartaoProduto.jsx - COMPONENTE REUTILIZÁVEL (card)
// Recebe UM produto por props e desenha o card.
// A página de lista chama este componente várias vezes (um por produto),
// cada vez passando um produto diferente.
import { Link } from 'react-router-dom';

export default function CartaoProduto({ produto }) {
  return (
    // <article> = HTML semântico para um item independente (card)
    <article className="cartao">
      {/* alt descreve a imagem para quem não pode vê-la */}
      <img src={produto.thumbnail} alt={produto.title} loading="lazy" />
      <h2>{produto.title}</h2>
      <p className="categoria">{produto.category}</p>
      <p className="preco">US$ {produto.price}</p>

      {/* Link para a rota de detalhe. Ex.: /produto/5
          O número vira o parâmetro ":id" lá na página de detalhe. */}
      <Link to={`/produto/${produto.id}`}>Ver detalhes</Link>
    </article>
  );
}
