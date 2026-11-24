// components/Mensagem.jsx - COMPONENTE REUTILIZÁVEL (usa props)
// Mostra os estados da interface: carregando, erro e sucesso.
// É usado em TODAS as páginas, evitando repetir o mesmo código.
//
// PROPS = "parâmetros" do componente, passados como atributos:
//   <Mensagem tipo="erro" texto="Algo deu errado" />
// Aqui usamos desestruturação: { tipo, texto } pega as props direto.
export default function Mensagem({ tipo, texto }) {
  // Erro usa role="alert" (leitor de tela avisa na hora).
  // Carregando e sucesso usam role="status" (aviso educado, sem interromper).
  const papel = tipo === 'erro' ? 'alert' : 'status';

  // className muda conforme o tipo: "mensagem erro", "mensagem sucesso"...
  return (
    <p role={papel} className={`mensagem ${tipo}`}>
      {texto}
    </p>
  );
}
