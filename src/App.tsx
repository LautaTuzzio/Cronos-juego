import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import HowToPlayPage from './pages/HowToPlayPage';
import GameModePage from './pages/GameModePage';
import GameContextPage from './pages/GameContextPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <GameProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-to-play" element={<HowToPlayPage />} />
            <Route path="/game-mode/:civilizationId" element={<GameModePage />} />
            <Route path="/game-context/:civilizationId/:mode" element={<GameContextPage />} />
            <Route path="/game/:civilizationId/:mode" element={<GamePage />} />
            <Route path="/results/:civilizationId/:mode" element={<ResultsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </GameProvider>
    </Router>
  );
}

export default App;