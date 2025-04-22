import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export type Poll = {
  id: number;
  title: string;
  options: string[];
  votes: number[];
  startDate: string;
  endDate: string;
};

export default function PollList() {
  const [status, setStatus] = useState('Todas');
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const storedPolls = localStorage.getItem('polls');
    const parsedPolls = storedPolls ? JSON.parse(storedPolls) : [];
    setPolls(parsedPolls);
  }, []);

  // Filtra por status
  const now = new Date();

  const filteredPolls = polls.filter(poll => {
    const start = new Date(poll.startDate);
    const end = new Date(poll.endDate);

    if (status === 'Todas') return true;
    if (status === 'Ativas') return start <= now && now <= end;
    if (status === 'Encerradas') return now > end;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-15 py-8">
      
      <div className="relative flex flex-col sm:flex-row items-center justify-center mb-8 max-w-6xl mx-auto gap-4 sm:gap-0">
        <div className="text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
          <h1 className="text-2xl font-bold">Enquetes</h1>
          <p className="text-gray-500 text-sm">Encontre aqui a sua enquete</p>
        </div>

        <div className="sm:ml-auto">
          <label htmlFor="status" className="block mb-1 text-sm text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="custom-select border bg-white border-gray-300 rounded-md px-3 py-1.5"
          >
            <option value="Todas">Todas</option>
            <option value="Ativas">Ativas</option>
            <option value="Encerradas">Encerradas</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPolls.length === 0 ? (
          <div>Não há enquetes para esse filtro.</div>
        ) : (
          filteredPolls.map((poll) => (
            <Link
              key={poll.id}
              to={`/poll/${poll.id}`}
              className="bg-white rounded shadow-md/30 px-12 py-4 hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2 text-start">{poll.title}</h2>
              <p className="text-sm text-gray-600 flex justify-between">
                <span>
                  Início: {new Date(poll.startDate).toLocaleDateString('pt-BR')} - {new Date(poll.startDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} hrs
                </span>
                <span>
                  Término: {new Date(poll.endDate).toLocaleDateString('pt-BR')} - {new Date(poll.endDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} hrs
                </span>
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
