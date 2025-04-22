import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Declarando os tipos de informações a serem recebidas
interface PollOption {
  label: string;
  votes: number;
}

//Declarando os tipos de informações a serem recebidas
interface Poll {
  id: number;
  title: string;
  options: string[];
  votes: number[];
}

//
const PollResultsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState<Poll | null>(null);

  //carrega as informações do armazenamento local
  useEffect(() => {
    const storedPolls = localStorage.getItem("polls");
    const polls = storedPolls ? JSON.parse(storedPolls) : [];
    const pollId = Number(id);
    const foundPoll = polls.find((p: Poll) => p.id === pollId);

    setPoll(foundPoll || null);
  }, [id]);

  //função para retornar a votação da enquete selecionada
  const handleBack = () => {
    navigate(`/poll/${id}`);
  };

  //validação caso não exista enquete
  if (!poll) return <div className="text-center text-gray-700">Enquete não encontrada.</div>;

  //mapeando cada opção de voto
  const totalVotes = poll.votes.reduce((sum, vote) => sum + vote, 0);
  const pollOptions: PollOption[] = poll.options.map((option, index) => ({
    label: option,
    votes: poll.votes[index] || 0,
  }));

  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="bg-white p-6 mt-10 rounded-lg shadow-md/30 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-start">{poll.title}</h2>
        <div className="space-y-4">
          {/*Lógica para calcular o tamanho das barras*/}
          {pollOptions.map((option, index) => {
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            return (
              <div key={index} className="w-full">
                <div className="w-full h-10 bg-darkblue rounded-lg flex items-center px-4 justify-between relative">
                  <span className="text-white font-medium text-md z-10">{option.label}</span>
                  <span className="text-white font-medium text-md z-10">{option.votes} votos</span>
                  <div
                    className="absolute left-0 top-0 h-10 bg-blue rounded-lg"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex">
          <button
            onClick={handleBack}
            className="bg-gray text-white px-6 py-2 rounded hover:bg-darkgray"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollResultsPage;
