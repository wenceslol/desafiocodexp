import { useState } from "react";

interface PollDetailsProps {
  question: string;
  options: string[];
  startDate: string;
  endDate: string;
  onVote: (selected: number) => void;
  onViewResults: () => void;
  onHandleBack: () => void;
}

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

  // Verificações seguras
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
        {isPollActive ? "Escolha uma resposta" : "Esta enquete não está ativa no momento"}
      </p>

      <form className="space-y-3 mb-6">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2">
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
