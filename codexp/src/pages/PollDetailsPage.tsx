import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importe useNavigate
import PollDetails from "../components/PollDetails";

export default function PollDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para navegação
  const [poll, setPoll] = useState<any | null>(null);

  useEffect(() => {
    // Lê as enquetes do localStorage
    const storedPolls = localStorage.getItem('polls');
    const polls = storedPolls ? JSON.parse(storedPolls) : [];

    // Converte o id da URL para número e encontra a enquete correspondente
    const pollId = Number(id);
    const foundPoll = polls.find((p: { id: number }) => p.id === pollId);

    // Se a enquete não tiver a propriedade 'votes', inicialize-a
    if (foundPoll && !foundPoll.votes) {
      foundPoll.votes = new Array(foundPoll.options.length).fill(0); // Inicializa os votos com 0 para cada opção
    }

    setPoll(foundPoll || null); // Atualiza o estado com a enquete encontrada
  }, [id]); // Recarrega quando o id da URL mudar

  // Função para processar o voto
  const handleVote = (selected: number) => {
    if (!poll) return;

    // Atualiza o array de votos
    const updatedVotes = [...poll.votes];
    updatedVotes[selected] += 1; // Incrementa o voto na opção escolhida

    // Cria um novo objeto de enquete com os votos atualizados
    const updatedPoll = { ...poll, votes: updatedVotes };

    // Atualiza o estado local
    setPoll(updatedPoll);

    // Salva a enquete atualizada no localStorage
    const storedPolls = localStorage.getItem('polls');
    const polls = storedPolls ? JSON.parse(storedPolls) : [];
    const pollIndex = polls.findIndex((p: { id: number }) => p.id === poll.id);
    if (pollIndex !== -1) {
      polls[pollIndex] = updatedPoll; // Substitui a enquete original com a atualizada
      localStorage.setItem('polls', JSON.stringify(polls)); // Salva novamente no localStorage
    }
    console.log(`Votou em ${poll.options[selected]}, enquete ${poll.id}`);
  };

  // Função para redirecionar à página de resultados
  const handleViewResults = () => {
    navigate(`/poll/${id}/results`); // Redireciona para a página de resultados
  };

    // Função para redirecionar à página de enquetes
    const handleBack = () => {
        navigate(`/polls`); // Redireciona para a página de resultados
      };

  // Se não encontrar a enquete, exibe uma mensagem
  if (!poll) return <div>Enquete não encontrada.</div>;

  return (
    <PollDetails
      question={poll.title}
      options={poll.options}
      startDate={poll.startDate}
      endDate={poll.endDate}
      onVote={handleVote} // Passa a função handleVote para o onVote
      onViewResults={handleViewResults} // Passa a função de redirecionamento
      onHandleBack={handleBack}
    />
  );
}