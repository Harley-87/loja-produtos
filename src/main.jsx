// main.jsx - PONTO DE ENTRADA da aplicação
// É o primeiro arquivo JS executado (o index.html carrega ele).
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// BrowserRouter habilita a navegação por rotas (React Router).
// Ele precisa "envolver" toda a aplicação para que <Routes>, <Link>,
// useParams() etc. funcionem em qualquer componente lá dentro.
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Pega a <div id="root"> do index.html e renderiza o React dentro dela.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
