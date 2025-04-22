import { useLocation, Link } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="w-full bg-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-sans font-semibold text-indigo-600 tracking-tight">
          My Poll
        </div>

        {/* Navegação */}
        <nav className="flex space-x-6 text-base font-medium">
          <Link
            to="/createPoll"
            className={`pb-1 ${
              location.pathname === '/createPoll'
                ? 'text-black underline decoration-2 decoration-indigo-600 underline-offset-26'
                : 'text-gray-400'
            }`}
          >
            Criar enquete
          </Link>
          <Link
            to="/polls"
            className={`pb-1 ${
              location.pathname === '/polls'
                ? 'text-black underline decoration-2 decoration-indigo-600 underline-offset-26'
                : 'text-gray-400'
            }`}
          >
            Enquetes
          </Link>
        </nav>
      </div>
    </header>
  );
}
