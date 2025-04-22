import { useState } from "react";


//Especifica as propriedades que serão passadas para o PollDetailsProps
interface PollDetailsProps {
  question: string;
  options: string[];
  startDate: string;
  endDate: string;
  onVote: (selected: number) => void;
  onViewResults: () => void;
  onHandleBack: () => void;
}


//Desestrutura os props e valida com a interface acima, além de exportar a função para outros componentes
export default function PollDetails({
  question,
  options,
  startDate,
  endDate,
  onVote,
  onViewResults,
  onHandleBack,
}: PollDetailsProps) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const now = new Date();

  // Validações para o formato da data
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  const isStartValid = start && !isNaN(start.getTime());
  const isEndValid = end && !isNaN(end.getTime());

  const isPollActive =
    isStartValid && isEndValid && start! <= now && now <= end!;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-md/30 mt-10">
      <h2 className="text-xl font-bold mb-2">{question}</h2>
      <p className="text-gray-500 mb-4">
        {/*Verifica se a data da enquete é valida para votação*/}
        {isPollActive ? "Escolha uma resposta" : "Esta enquete não está ativa no momento"}
      </p>

      <form className="space-y-3 mb-6">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2">
            {/*Verifica se a data da enquete é valida para votação*/}
            <input
              type="radio"
              name="poll"
              value={option}
              checked={selectedOptionIndex === index}
              onChange={() => setSelectedOptionIndex(index)}
              className="accent-blue-600"
              disabled={!isPollActive}
            />
            <span>{option}</span>
          </label>
        ))}
      </form>

      <div className="flex gap-4">
        {/*Verifica se a data da enquete é valida para votação*/}
        <button
          onClick={() => onVote(selectedOptionIndex!)}
          disabled={selectedOptionIndex === null || !isPollActive}
          className="bg-blue text-white px-6 py-2 rounded hover:bg-darkblue disabled:opacity-50"
        >
          Votar
        </button>
        <button
          onClick={onViewResults}
          className="bg-gray text-white px-6 py-2 rounded hover:bg-darkgray"
        >
          Resultados
        </button>
        <button
          onClick={onHandleBack}
          className="bg-gray text-white px-6 py-2 rounded hover:bg-darkgray"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
