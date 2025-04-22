import './App.css'
import CreatePoll from './pages/CreatePoll'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PollList from './pages/PollList';
import PollDetailsPage from "./pages/PollDetailsPage";
import PollResultsPage from "./pages/PollResultsPage.tsx";

function App() {

  return (
    <>
      <Router>
        <Header />
        <main className="p-4">
          <Routes>
            <Route path="/createPoll" element={<CreatePoll />} />
            <Route path="/polls" element={<PollList />} />
            <Route path="/poll/:id" element={<PollDetailsPage />} />
            <Route path="/poll/:id/results" element={<PollResultsPage />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
