<p align="center">
  <img src="public/logo.svg" width="96" alt="Logo da Loja DummyJSON: uma sacola de compras azul">
</p>

# Loja de Produtos (React + Vite + DummyJSON)

Aplicação Web de página única (SPA) feita em React para a avaliação bimestral de
Tecnologias para Internet (Faculdade Senac Cascavel). Ela consome o recurso
**Produtos** da API pública [DummyJSON](https://dummyjson.com/docs/products).
Só o front-end foi desenvolvido: não há backend nem persistência de dados.

**Integrantes:** Alexys e Harley

## Objetivo

Permitir que o usuário navegue por um catálogo de produtos, pesquise, filtre por
categoria, veja os detalhes de um produto, cadastre um novo produto e exclua um produto.

## Endpoints utilizados

Base: `https://dummyjson.com/products`

| Funcionalidade | Método | Endpoint |
| --- | --- | --- |
| Listar produtos | GET | `/products?limit=12` |
| Buscar por texto | GET | `/products/search?q=termo` |
| Listar categorias | GET | `/products/category-list` |
| Filtrar por categoria | GET | `/products/category/{categoria}` |
| Detalhar produto | GET | `/products/{id}` |
| Cadastrar produto | POST | `/products/add` |
| Excluir produto | DELETE | `/products/{id}` |

## Rotas da aplicação

| Rota | Página | O que faz |
| --- | --- | --- |
| `/` | `ListaProdutos` | Lista em cards, busca e filtro por categoria |
| `/produto/:id` | `DetalheProduto` | Detalhes do produto e botão de excluir |
| `/novo` | `NovoProduto` | Formulário de cadastro (POST) |

## Interface e identidade visual

- **Identidade:** tema de loja virtual, com cabeçalho azul e uma logo em SVG (`public/logo.svg`,
  uma sacola de compras) ao lado do nome do app. A imagem é decorativa (`alt=""`), pois o nome
  ao lado já é lido pelos leitores de tela.
- **Lista:** busca por texto e filtro por categoria lado a lado, com rótulos acima dos campos e
  mesma altura. Os produtos aparecem em cards numa grade que se adapta à largura da tela.
- **Formulário de novo produto:** centralizado na página, em uma coluna estreita (máx. 480 px),
  junto com o título e as mensagens de erro e sucesso.
- **Acessibilidade:** HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`),
  `label` ligado ao campo por `htmlFor`/`id`, `role="alert"` para erros, `role="status"` para
  carregando e sucesso, e foco visível ao navegar com a tecla Tab.
- **Responsividade:** CSS com grid, `flex-wrap` e `@media`, sem bibliotecas externas.

## Como instalar e executar

Pré-requisito: [Node.js](https://nodejs.org/) (versão LTS).

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal ao lado de `Local` (normalmente http://localhost:5173/).

Outros comandos: `npm run build` (gera a versão de produção) e `npm run lint` (verifica o código).

## Estrutura do projeto

```
src/
  main.jsx                 ponto de entrada (BrowserRouter)
  App.jsx                  cabeçalho + tabela de rotas
  index.css                estilos (responsivo)
  components/              componentes reutilizáveis
    Cabecalho.jsx          menu de navegação
    CartaoProduto.jsx      card de um produto (props)
    Mensagem.jsx           carregando / erro / sucesso (props)
  pages/                   uma página por rota
    ListaProdutos.jsx
    DetalheProduto.jsx
    NovoProduto.jsx
  services/
    produtosService.js     todas as chamadas fetch à API
public/
  logo.svg                 logo exibida no cabeçalho
```

## Observações sobre limitações da API

- A DummyJSON **simula** as operações de escrita. `POST` e `DELETE` devolvem uma resposta de sucesso, mas **nada é salvo de verdade** no servidor.
- Por isso, um produto cadastrado não aparece na lista, e um produto excluído continua aparecendo ao recarregar a lista. A aplicação mostra a resposta simulada da API ao usuário.
- O produto "criado" recebe um id novo (por exemplo, 195). Esse id não existe para consulta:
  um `GET /products/195` retorna erro 404.
- A lista usa `limit=12` para não carregar todos os produtos de uma vez.
